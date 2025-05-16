// original code (GIVEN)
function fetchDataOld(url, callback) {
  makeHTTPRequest(url, (response) => {
    parseResponse(response, (data) => {
      processData(data, (result) => {
        callback(result);
      });
    });
  });
}


function makeHTTPRequest(url) {
  return new Promise((resolve) => {
    resolve(mockResponse);
  });
}

function parseResponse(response) {
  return new Promise((resolve, reject) => {
    if (response["status"] == 200) {
      resolve(mockData);
    }
    else {
      reject("STATUS ERROR")
    }
  });
}

function processData(data) {
  return new Promise((resolve) => {
    resolve(expectedResult);
  });
}

// implementation using promises (TO BE ADDED BY THE STUDENT)
function fetchData(url) {
  return makeHTTPRequest(url)
    .then(parseResponse)
    .then(processData);
}

// Test case 1: Successful data retrieval and processing
let mockResponse = { status: 200, data: { message: "Mock response received" } };
const mockData = { userId: 123, username: "mockuser" };
const expectedResult = { id: 123, name: "Mock User" };

async function runTestCase() {
  try {
    const result = await fetchData("https://google.com/api");

    if (JSON.stringify(result) === JSON.stringify(expectedResult)) {
      console.log("Test case passed: Successful data retrieval and processing");
    } else {
      console.error("Test case failed: Unexpected result");
    }
  } catch (error) {
    console.error("Test case failed with an error:", error);
  }
}

runTestCase();
/*Expected output
Test case passed: Successful data retrieval and processing
*/



// Test case 2: Error
mockResponse = { status: 400, data: { message: "Unable to process" } };
runTestCase();
/*Expected output
Test case failed with an error: STATUS ERROR
*/
