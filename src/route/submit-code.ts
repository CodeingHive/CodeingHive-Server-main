import express, { Request, Response, Router } from 'express';
import { spawn } from 'child_process';
import fs from 'fs';
import { performance } from 'perf_hooks';
import { randomBytes } from 'crypto';

const codeRouter: Router = express.Router();

// Function to generate a random string for the output file name
function generateRandomFileName(length: number): string {
    return randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

// Define a job queue to limit concurrent job execution
const jobQueue: {
    jobId: number;
    code: string;
    language: string;
    res: Response;
}[] = [];

// Counter to assign unique job IDs
let jobIdCounter = 1;

// Maximum number of concurrent jobs
const maxConcurrentJobs = 50;

// Function to process a job
async function processJob(job: {
    jobId: number;
    code: string;
    language: string;
    res: Response;
}) {
    const userCode = job.code;
    const language = job.language;

    // Generate a random output file name based on the language
    const randomFileName = `${generateRandomFileName(10)}.${language}`;

    const startTime = performance.now();

    if (language === 'cpp') {
        fs.writeFile(randomFileName, userCode, (err) => {
            if (err) {
                return job.res.status(500).json({ message: 'Error writing code to file' });
            }
            const compileProcess = spawn('g++', [randomFileName, '-o', 'user_code']);
            compileProcess.on('exit', (code) => {
                const endTime = performance.now();
                const compilationTime = endTime - startTime;

                if (code === 0) {
                    const runProcess = spawn('./user_code');
                    let output = '';

                    runProcess.stdout.on('data', (data) => {
                        output += data.toString();
                    });

                    runProcess.stderr.on('data', (data) => {
                        output += data.toString();
                    });

                    runProcess.on('close', (code) => {
                        const executionTime = performance.now() - startTime;
                        job.res.status(200).json({ message: 'Code executed successfully', output, compilationTime, executionTime });
                        // Remove the job from the queue
                        const jobIndex = jobQueue.findIndex((queuedJob) => queuedJob.jobId === job.jobId);
                        if (jobIndex !== -1) {
                            jobQueue.splice(jobIndex, 1);
                        }
                        // Delete the temporary files
                        fs.unlink(randomFileName, (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            }
                        });
                        fs.unlink('user_code', (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            }
                        });
                        // Process the next job if any
                        if (jobQueue.length > 0) {
                            processJob(jobQueue.shift()!);
                        }
                    });
                } else {
                    job.res.status(200).json({ message: 'Compilation error', output: 'Compilation failed', compilationTime });
                    // Remove the job from the queue
                    const jobIndex = jobQueue.findIndex((queuedJob) => queuedJob.jobId === job.jobId);
                    if (jobIndex !== -1) {
                        jobQueue.splice(jobIndex, 1);
                    }
                    // Delete the temporary files
                    fs.unlink(randomFileName, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        }
                    });
                    // Process the next job if any
                    if (jobQueue.length > 0) {
                        processJob(jobQueue.shift()!);
                    }
                }
            });
        });
    } else if (language === 'python') {
        fs.writeFile(randomFileName, userCode, (err) => {
            if (err) {
                return job.res.status(500).json({ message: 'Error writing code to file' });
            }
            const runProcess = spawn('python3', [randomFileName]);
            let output = '';

            runProcess.stdout.on('data', (data) => {
                output += data.toString();
            });

            runProcess.stderr.on('data', (data) => {
                output += data.toString();
            });

            runProcess.on('close', (code) => {
                const executionTime = performance.now() - startTime;
                job.res.status(200).json({ message: 'Code executed successfully', output, executionTime });
                // Remove the job from the queue
                const jobIndex = jobQueue.findIndex((queuedJob) => queuedJob.jobId === job.jobId);
                if (jobIndex !== -1) {
                    jobQueue.splice(jobIndex, 1);
                }
                // Delete the temporary files
                fs.unlink(randomFileName, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    }
                });
                // Process the next job if any
                if (jobQueue.length > 0) {
                    processJob(jobQueue.shift()!);
                }
            });
        });
    } else if (language === 'java') {
        fs.writeFile(randomFileName, userCode, (err) => {
            if (err) {
                return job.res.status(500).json({ message: 'Error writing code to file' });
            }
            const compileProcess = spawn('javac', [randomFileName]);
            compileProcess.on('exit', (code) => {
                const endTime = performance.now();
                const compilationTime = endTime - startTime;

                if (code === 0) {
                    const runProcess = spawn('java', ['user_code']);
                    let output = '';

                    runProcess.stdout.on('data', (data) => {
                        output += data.toString();
                    });

                    runProcess.stderr.on('data', (data) => {
                        output += data.toString();
                    });

                    runProcess.on('close', (code) => {
                        const executionTime = performance.now() - startTime;
                        job.res.status(200).json({ message: 'Code executed successfully', output, compilationTime, executionTime });
                        // Remove the job from the queue
                        const jobIndex = jobQueue.findIndex((queuedJob) => queuedJob.jobId === job.jobId);
                        if (jobIndex !== -1) {
                            jobQueue.splice(jobIndex, 1);
                        }
                        // Delete the temporary files
                        fs.unlink(randomFileName, (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            }
                        });
                        fs.unlink('user_code.class', (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            }
                        });
                        // Process the next job if any
                        if (jobQueue.length > 0) {
                            processJob(jobQueue.shift()!);
                        }
                    });
                } else {
                    job.res.status(200).json({ message: 'Compilation error', output: 'Compilation failed', compilationTime });
                    // Remove the job from the queue
                    const jobIndex = jobQueue.findIndex((queuedJob) => queuedJob.jobId === job.jobId);
                    if (jobIndex !== -1) {
                        jobQueue.splice(jobIndex, 1);
                    }
                    // Delete the temporary files
                    fs.unlink(randomFileName, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        }
                    });
                    // Process the next job if any
                    if (jobQueue.length > 0) {
                        processJob(jobQueue.shift()!);
                    }
                }
            });
        });
    } else {
        job.res.status(200).json({ message: 'Language not supported', output: 'Language not supported' });
        // Remove the job from the queue
        const jobIndex = jobQueue.findIndex((queuedJob) => queuedJob.jobId === job.jobId);
        if (jobIndex !== -1) {
            jobQueue.splice(jobIndex, 1);
        }
        // Process the next job if any
        if (jobQueue.length > 0) {
            processJob(jobQueue.shift()!);
        }
    }
}

// API endpoint to submit a new job
codeRouter.post('/', (req: Request, res: Response) => {
    if (req.body.code === undefined || req.body.language === undefined) {
        return res.status(400).json({ message: 'Missing code or language in the request' });
    }

    if (jobQueue.length >= maxConcurrentJobs) {
        return res.status(200).json({ message: 'Queue is full. Please wait.', jobId: jobIdCounter, queue: 'waiting' });
    }

    // Assign a job ID and add the job to the queue
    const jobId = jobIdCounter++;
    jobQueue.push({
        jobId,
        code: req.body.code,
        language: req.body.language,
        res
    });

    // If this is the only job in the queue, start processing it
    if (jobQueue.length === 1) {
        processJob(jobQueue.shift()!);
    }
});

export default codeRouter;
