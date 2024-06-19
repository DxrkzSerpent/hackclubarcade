#include <Stepper.h>
#include <Adafruit_NeoPixel.h>

#define MOTION 16
#define NEOPIXEL 17       
#define NUMPIXELS 1

const int stepsPerRevolution = 50;  

Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, NEOPIXEL, NEO_GRB + NEO_KHZ800);
Stepper myStepper(stepsPerRevolution, 3, 2, 1, 0);


void setup() {
  pinMode(MOTION, INPUT);
  strip.begin();
  strip.show();
  Serial1.begin(115200);
  myStepper.setSpeed(30);
}


void loop() {
  bool motionDetected = digitalRead(MOTION);

  if (digitalRead(MOTION) == HIGH) {
    strip.setPixelColor(0, strip.Color(255, 255, 255));
    strip.show();
    Serial1.println("Motion Detected, Opening.");
  } else {
    strip.setPixelColor(0, strip.Color(0, 0, 0));
    strip.show();
    Serial1.println("Closed");
  }

  while (motionDetected) {
    myStepper.step(stepsPerRevolution);
  }

  delay(1); 
}
