const updateDate = () => {
  const currentDateTimeElement = document.getElementById('currentDate');

  // Get current date and time
  const currentDateTime = new Date();

  // Format date and time as desired
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

  // Insert formatted date and time into HTML
  currentDateTimeElement.textContent = formattedDateTime;
}

setInterval(updateDate, 1000);

const submitEvent = (event) => {
  event.preventDefault(); // Prevent form submission

  // Get the value of the text input field
  let textInputValue = document.getElementById('textInput').value;

  // Get the select element
  const selectElement = document.getElementById('mySelect');

  // Get the selected option's value
  const selectedOption = selectElement.value;

  const currentEpoch = Math.floor(Date.now() / 1000);

  const engine = {
    epoch: currentEpoch,
    option: selectedOption
  }

  // Store the setting in local storage
  localStorage.setItem('engine', JSON.stringify(engine));

  let searchEngine = `https://duckduckgo.com/?`;
  let firstResult = false;
  
  switch (selectedOption) {
    case 'yandex':
      searchEngine = `https://yandex.com/?`;
      break;
    case 'google':
      searchEngine = `https://google.com/search?`;
      break;
    case 'searx':
      searchEngine = `https://searxng.site/?`;
      break;
    case 'wikipedia':
      searchEngine = `https://duckduckgo.com/?sites=wikipedia.org&`;
      break;
    case 'wikipedia-quick':
      searchEngine = `https://duckduckgo.com/?sites=wikipedia.org&`;
      firstResult = true;
      break;
    case 'wikipedia-bang':
      searchEngine = `https://duckduckgo.com/?`;
      textInputValue = "!w " + textInputValue;
      break;
    case 'cppreference':
      searchEngine = `https://duckduckgo.com/?sites=cppreference.com&`;
      break;
    case 'cppreference-quick':
      searchEngine = `https://duckduckgo.com/?sites=cppreference.com&`;
      firstResult = true;
      break;
    case 'cppreference-bang':
      searchEngine = `https://duckduckgo.com/?`;
      textInputValue = "!cpp " + textInputValue;
      break;
    case 'duck':
    default:
      break;
  }

  let firstResultString = "";
  if (firstResult) {
    firstResultString = "\\";
  }

  // Construct the DuckDuckGo search URL
  const searchUrl = `${searchEngine}q=${firstResultString}${encodeURIComponent(textInputValue)}`;

  // Redirect the user to the DuckDuckGo search results page
  window.location.href = searchUrl;
}

// Get the submit button element
const submitButton = document.getElementById('submitButton');
// Add click event listener to the submit button
submitButton.addEventListener('click', submitEvent);

// Get the text input element
const textInput = document.getElementById('textInput');

// Focus on the text input when the page is loaded
window.addEventListener('load', function() {
  textInput.focus();

  // Retrieve the stored value from local storage
  const storedValue = JSON.parse(localStorage.getItem('engine'));

  // Get the select element
  const selectElement = document.getElementById('mySelect');

  // Loop through each option to find the matching value
  if ((storedValue.epoch + 180) > Math.floor(Date.now() / 1000)) {
    Array.from(selectElement.options).forEach(option => {
      if (option.value === storedValue.option) {
        // Set the selected attribute of the matching option
        option.selected = true;
      }
    });
  }
});

textInput.addEventListener('keydown', function(event) {
  // Check if the pressed key is Enter
  if (event.key === 'Enter') {
    // Call the function to handle the Enter key press
    submitEvent(event);
  }

  if (event.key === 'Escape') {
    // Clear the input value
    document.getElementById('textInput').value = '';
  }
});
