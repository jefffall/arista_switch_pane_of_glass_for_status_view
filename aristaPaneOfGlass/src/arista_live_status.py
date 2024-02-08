from flask import Flask, request, jsonify, render_template, redirect
import requests
import json
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
from time import strftime, localtime
from datetime import timedelta
import paramiko
import pyeapi
import speech_recognition as sr

pyeapi.load_config('/Users/jfall/eclipse-workspace/aristaPaneOfGlass/src/eapi.conf')


print ("hello")
app = Flask(__name__, static_url_path='')
"""
Flask app is started here. Flask listens for inbound requests on port 8080 and runs the threading
"""


def send_to_eos(command):
    uname = upass = 'eapi'
    uri = 'https://192.168.1.242/command-api'
    s = requests.session()
    s.auth = (uname,upass)
    s.verify = False
    s.headers.update({'Content-Type' : 'application/json'})
    data = {'jsonrpc': '2.0','method': 'runCmds','params': {'format': 'json','timestamps': False,'cmds': [''], 'version': 1}, 'id': 'PythonScript-1'}
    data['params']['cmds'] = [command]
    r = s.request('post', uri, data=json.dumps(data))
    #print (r.content)
    mydata = json.loads(json.dumps(r.json()))
    return mydata
    
def eos_command(command):
    myresult = send_to_eos(command)
    try:
        goodresult = myresult['result']
        mydict = goodresult.pop()
        return mydict
    except KeyError:
        return myresult['error']['message']

def get_time_hh_mm_ss(sec):
    td_str = str(timedelta(seconds=sec))
    x = td_str.split(':')
    for sub in range(0,2):
        if len(x[sub]) == 1:
            x[sub] = "0" + x[sub]
    return {"uptime" : x[0]+' hours '+x[1]+' minutes '+x[2]+" sec"}
   
def get_version():
    myversion = eos_command("show version")
    version = myversion['version']
    uptime_sec = int(myversion['uptime'])
    boottime_epoch = int(myversion['bootupTimestamp'])
    boot_time = strftime('%Y-%m-%d %H:%M:%S', localtime(boottime_epoch))
    uptime = get_time_hh_mm_ss(uptime_sec)
    return {"boot_time" : boot_time, "version" : version, "uptime" : uptime}

@app.route('/get_eos_log', methods=['GET'])
def get_eos_log():
    with paramiko.SSHClient() as ssh:
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect("192.168.1.242", username="bashuser", password="bashuser")
        sftp = ssh.open_sftp()
        sftp.get("/home/bashuser/eos", "/tmp/eos")
        myfd = open ("/tmp/eos","r")
        eos = myfd.read()
        eos = eos.replace("\n", "<p>")
        myfd.close()
        return jsonify({"eos" : eos})

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/run_eos_command', methods=['GET'])
def run_mycommand():
    #print ("=================================================================")
    command = request.args.get('command')
    try:
        node = pyeapi.connect_to('arista-01')
        
    except Exception as e:
        print ("connection to arista-01 has failed")
        print (e)
        return jsonify({"command_response" : "call to node = pyeapi.connect_to('arista-01') has failed"}) 
    print ("=====")
    try:
        my_result = node.enable(command)
        print (my_result)
        print ("=====")
        my_response = str(my_result[0])
        return jsonify({"command_response" : my_response}) 
    except Exception as e:
        print ("error")
        print (e)
        #print (my_result)
        return jsonify({"command_response" : command+" is invalid or had an exception" + e})
   
   
    
    """
    try:
        print (type(myresult))
        print (myresult)
        goodresult = myresult['result']
        return jsonify({'command_response' : goodresult})
    except KeyError:
        return jsonify({'command_response' : myresult['error']['message']})
    """
    
@app.route('/get_arista_switch_status', methods=['GET'])
def get_switch_status():
    commands_list = ["show hostname", "show clock", "show ntp status", "show ip name-server", "show dns domain", "show dhcp server"]
    
    results_list = []
    version_json = get_version()
      
    results_list.append(version_json)
    for command in commands_list:
        myresult = eos_command(command)
        results_list.append(myresult)
        
       
    if len(str(results_list[2]['localTime']['hour'])) == 1:
        results_list[2]['localTime']['hour'] = "0" + str(results_list[2]['localTime']['hour'])
    if len(str(results_list[2]['localTime']['min'])) == 1:
        results_list[2]['localTime']['min'] = "0" + str(results_list[2]['localTime']['min'])
    if len(str(results_list[2]['localTime']['sec'])) == 1:
        results_list[2]['localTime']['sec'] = "0" + str(results_list[2]['localTime']['sec'])
    #print (results_list)
    return jsonify(results_list)

@app.route("/voice_to_text", methods=["GET", "POST"])
def index():
    transcript = ""
    if request.method == "POST":
        print("FORM DATA RECEIVED")

        if "file" not in request.files:
            return redirect(request.url)

        file = request.files["file"]
        if file.filename == "":
            return redirect(request.url)

        if file:
            recognizer = sr.Recognizer()
            audioFile = sr.AudioFile(file)
            with audioFile as source:
                data = recognizer.record(source)
            transcript = recognizer.recognize_google(data, key=None)

    return render_template('index.html', transcript=transcript)

@app.route("/process_audio")
def process_audio():
    url = request.args.get("url")
    print (url)
    #text = search.a_function(url) #returns the text from the audio, which you've done, so I've omitted code
    if url != None:
        return jsonify(result="success",text=url)
    else:
        return jsonify(result="fail")
    
@app.route("/uploadAudio",methods=["POST"])
def uploadAudio():
    f = request.files["file"]
    print (f)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.run(host='192.168.1.116', port=8080, debug=False, use_reloader=False)