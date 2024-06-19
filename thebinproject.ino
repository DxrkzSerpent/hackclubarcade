#include <Keypad.h>
#include <Adafruit_NeoPixel.h>

const uint8_t KEYPAD_ROWS = 4;
const uint8_t KEYPAD_COLS = 3;
byte rowPins[KEYPAD_ROWS] = {0, 1, 2, 3};
byte colPins[KEYPAD_COLS] = {4, 5, 6};
char keys[KEYPAD_ROWS][KEYPAD_COLS] = {
  { '1', '2', '3', },
  { '4', '5', '6', },
  { '7', '8', '9', },
  { '*', '0', '#', }
};

#define NEOPIXEL 17       
#define NUMPIXELS 1

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, KEYPAD_ROWS, KEYPAD_COLS);
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, NEOPIXEL, NEO_GRB + NEO_KHZ800);

#define MOTION 16

void setup() {
  pinMode(MOTION, INPUT);
  strip.begin();
  strip.show();
  Serial1.begin(115200);
}


void loop() {
  bool motion_detected = digitalRead(MOTION);
  char key = keypad.getKey();

  if (motion_detected) {
    strip.setPixelColor(0, strip.Color(255, 255, 255));
    strip.show();
  } else {
    strip.setPixelColor(0,strip.Color(0, 0, 0));
    strip.show();
  }

  delay(1); 
}
