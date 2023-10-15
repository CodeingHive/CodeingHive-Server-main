# Code Execution API with Job Queue

## Dependencies

- **Express.js**: The web server framework used to handle HTTP requests and responses.
- **Child Process**: The Node.js module used to spawn child processes for code compilation and execution.
- **File System (fs)**: The module used to read and write files, as well as delete temporary files.
- **Performance Hooks**: The module for high-resolution time measurements.
- **Crypto**: The module used for generating random file names.

## Endpoints

### 1. POST `/`

This endpoint is used to submit a new code execution job. A job consists of the user's code and the programming language in which it is written.

- **Request Body**:
  - `code` (string): The user's code to execute.
  - `language` (string): The programming language of the code (e.g., 'cpp', 'python', 'java').

- **Response**:
  - If both `code` and `language` are provided in the request body, the job is added to the job queue.
  - If the queue is full (reached the maximum number of concurrent jobs), the response indicates that the queue is full and assigns a unique job ID. The job is queued for execution.
  
### 2. ProcessJob Function

This function processes jobs from the job queue. It handles code execution based on the language specified in the job.

#### Processing C++ Code (language: 'cpp')

- The user's code is written to a temporary file.
- The C++ code is compiled using `g++`.
- If compilation is successful, the compiled program is executed.
- Output, compilation time, and execution time are recorded.
- The response is sent with the result and timing information.
- Temporary files are deleted upon job completion.

#### Processing Python Code (language: 'python')

- The user's code is written to a temporary file.
- The Python code is executed using the `python` interpreter.
- Output and execution time are recorded.
- The response is sent with the result and timing information.
- Temporary files are deleted upon job completion.

#### Processing Java Code (language: 'java')

- The user's code is written to a temporary file.
- The Java code is compiled using `javac`.
- If compilation is successful, the compiled Java program is executed.
- Output, compilation time, and execution time are recorded.
- The response is sent with the result and timing information.
- Temporary files are deleted upon job completion.

#### Handling Errors

- If any errors occur, appropriate error responses are sent.
- The job is removed from the queue.

## Job Queue

- The job queue is an array that holds job objects.
- Each job has a unique `jobId`, code, language, and a response object (`res`) to send a response when the job is completed.

## Configuration

- `maxConcurrentJobs`: The maximum number of concurrent jobs allowed. You can adjust this value to control concurrency.
- A random file name is generated for each job's temporary file to avoid conflicts.

## Usage

1. Send a POST request to `/` with `code` and `language` in the request body to execute code.
2. The code execution request is added to the job queue.
3. Jobs in the queue are processed sequentially, with controlled concurrency.
4. The response includes the result, compilation time, and execution time (if applicable).
5. Temporary files are deleted after job completion.

## Notes

- Error handling is included for code execution and file operations.
- Resource cleanup is performed to prevent file and resource leaks.