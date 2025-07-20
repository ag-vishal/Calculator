 // Initialize the input string and reference to the display input element
  let s = ""; // Stores the current expression string
  let ipr = document.querySelector("input"); // Reference to the input display
  let k = ""; // Stores the last key pressed (not essential here, but kept for tracking)
  const op = "+-*/.%"; // Allowed operators

  // Function to handle all button presses
  function fun(ch) {
    // Turn off the calculator (clear everything)
    if (ch == "off") {
      s = "";
      ipr.value = s;
    }

    // All Clear (reset display to 0)
    else if (ch == "ac") {
      s = "0";
      ipr.value = s;
    }

    // Clear last character (backspace functionality)
    else if (ch == "c") {
      if (s.length > 1) {
        s = s.slice(0, s.length - 1); // Remove last character
      } else if (s.length == 1) {
        s = "0"; // Reset to 0 if only one character left
      } else {
        s = ""; // Empty string case
      }
      ipr.value = s;
    }

    // Evaluate the expression
    else if (ch == "=") {
      if (s.length > 0) {
        try {
          ipr.value = eval(s); // Evaluate the expression (⚠ unsafe in production)
          s = ipr.value; // Store result for further use
        } catch {
          ipr.value = "Error"; // Handle invalid expressions
          s = "";
        }
      }
    }

    // For all other input buttons (numbers, operators)
    else {
      // If current expression is not "0" and not empty
      if (s != "0" && s.length != 0) {
        // Prevent two operators being added consecutively
        if (op.includes(ch) && op.includes(s[s.length - 1])) {
          s = s.slice(0, s.length - 1) + ch; // Replace last operator
        } else {
          s = s + ch; // Add character to expression
        }
        ipr.value = s;
      }

      // If current string is "0"
      else if (s == "0") {
        if (op.includes(ch) || ch == "**") {
          // If input is an operator, append it to "0"
          s = s + ch;
        } else {
          // Replace "0" with number or decimal
          s = ch;
        }
        ipr.value = s;
      }
    }

    // Update last key pressed
    k = ch;
  }
