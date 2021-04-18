#include "SPIFFS.h"
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <PubSubClient.h>
#include "topSecret.h"

const char* ssid = "vodafone-9C33"; //Provide your SSID
const char* password = "GQ8FU4JCLMMB64RR"; // Provide Password

const char* mqtt_server = "a3ddoytnj05dne-ats.iot.us-east-1.amazonaws.com"; // Relace with your MQTT END point
const int mqtt_port = 8883;


char payload[512];
char *ourTopic = "testTopic";
char testString[30] = "Test message!";

int hallMonitorVal = 0;
int touchSensorVal=50;
int hallMonitorPrevVal = -1; 
int touchSensorPrevVal=0;//set previous value check for false-positive cases;
int openingTime = 800;
int closingTime = 2000; //might need to replace this, not sure how to implement time yet
int touchSensorFlag = 0;
int hallMonitorFlag = 0;

String touchSensorStatus;
String hallMonitorStatus;

WiFiClientSecure espClient;
PubSubClient client(espClient);

void ourCallback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP32-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish(ourTopic, "hello world");
      // ... and resubscribe
      client.subscribe(ourTopic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
  
}

void setup() {
  Serial.begin(115200);
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  espClient.setCACert(AmazonRootCA1);
  espClient.setCertificate(certificatePem);
  espClient.setPrivateKey(privatePem);

  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(ourCallback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  client.publish(ourTopic, testString);
  delay(1000);

  hallMonitorVal = hallRead();
  touchSensorVal = touchRead(T0);
  
  if((hallMonitorVal<=0)&&(hallMonitorPrevVal<=0)){
    Serial.println(hallMonitorVal);
    hallMonitorFlag = 0;
  } 
  else if((hallMonitorVal>0)&&(hallMonitorPrevVal>0)){
    Serial.println(hallMonitorVal);
    hallMonitorFlag = 1;
  }

  if((touchSensorVal <35) && (touchSensorPrevVal<35)){
    if(true){  //todo replace with a check for time
      Serial.println(touchSensorVal);
      touchSensorFlag = 1;
      //todo: replace with sending notification to AWS that the handle was touched
    }
  } 
  else {
    touchSensorFlag = 0;
  }
  //todo: add change opening hours functionality

  delay(500);

  if (touchSensorFlag == 1){
    touchSensorStatus = "TRIPPED";
  }
  else{
    touchSensorStatus = "SET";
  }
    
  if (hallMonitorFlag == 1){
    hallMonitorStatus = "TRIPPED";
  }
  else{
    hallMonitorStatus = "SET";
  }
  Serial.print("Publish Message:");   

  client.publish(touchSensorStatus, " Touch Sensor Status");
  delay(1000);    
  
  client.publish(hallMonitorStatus, " Hall Monitor Status");
  delay(1000);    
  
  hallMonitorPrevVal = hallMonitorVal;
  touchSensorPrevVal = touchSensorVal;
}
