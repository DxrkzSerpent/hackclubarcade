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

#define motion 16

const String password = "6089"; // Change this to your desired password
String inputPassword;

void setup() {
  pinMode(motion, INPUT);
  strip.begin();
  strip.show();
  Serial1.begin(115200);
  keypad.addEventListener(keypadEvent);
}


void loop() {
  bool motion_detected = digitalRead(motion);
  if (digitalRead(motion) == HIGH) {
    Serial1.println("Motion detected! Enter password:");
    char key = keypad.getKey();
    if (key) {
      keypadEvent(key);
    }
    strip.setPixelColor(0, strip.Color(255, 255, 255));
    strip.show();
  } else {
    strip.setPixelColor(0, strip.Color(0, 0, 0));
    strip.show();
  }

  delay(1);
}

void keypadEvent(KeypadEvent key) {
  if (key == '*') {
    inputPassword = ""; // Reset the input password
  } else if (key == '#') {
    // Check if the input password matches the set password
    if (inputPassword == password) {
      Serial.println("Access Granted!");
      strip.setPixelColor(0, strip.Color(0, 255, 0)); // Green
      strip.show();
    } else {
      Serial.println("Access Denied!");
    }
    inputPassword = ""; // Reset the input password after checking
  } else {
    inputPassword += key; // Append the pressed key to the input password
  }
}
