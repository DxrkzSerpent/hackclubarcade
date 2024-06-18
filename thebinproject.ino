#include <Keypad.h>
#include <Adafruit_NeoPixel.h>

const uint8_t ROWS = 4;
const uint8_t COLS = 3;
byte rowPins[KEYPAD_ROWS] = {0, 1, 2, 3};
byte colPins[KEYPAD_COLS] = {4, 5, 6};
char keys[ROWS][COLS] = {
  { '1', '2', '3', },
  { '4', '5', '6', },
  { '7', '8', '9', },
  { '*', '0', '#', }
};

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, KEYPAD_ROWS, KEYPAD_COLS);
Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

#define motion 16
#define neoPixel 6           
#define NUMPIXELS 17 
bool motion_detected = digitalRead(motion);

void setup() {
  pinMode(motion, INPUT);
  strip.begin();
  strip.show();
  Serial1.begin(115200);
  Serial1.println("Hello, Raspberry Pi Pico W!");
}
void loop() {
  colorWipe(strip.Color(255, 0, 0), 50);
  if (motion_detected) {
    Serial1.println("Motion detected!");
  } else {
    Serial1.println("No motion.");
  }

  delay(1); // this speeds up the simulation
}
