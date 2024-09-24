import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAssignment,
  getCourse,
  sendEmail,
  uploadAssignment,
} from "../services/AdminService";
import axios from "axios";

const AssignmentComponent = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState("");
  const [duration, setDuration] = useState("");
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    if (courseId) {
      getCourse(courseId)
        .then((response) => {
          setCourseName(response.data.courseName);
          setDuration(response.data.duration);
          setFileName(response.data.assignmentFileName);
        })
        .catch((error) => console.error(error));
    }
  }, [courseId]);

  function handleUpload(event: any) {
    event.preventDefault();
    if (!file) {
      setMsg("no file selected");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
    setMsg("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    axios
      .post(`http://localhost:8080/uploadFile/${courseId}`, fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              pc: progressEvent.progress ? progressEvent.progress * 100 : 100,
            };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMsg("Upload successful.");
        console.log(res.data);
      })
      .catch((err) => {
        setMsg("Upload failed.");
        console.log(err);
      });
  }

  function checkFile() {
    if (fileName) {
      return (
        <p>
          Assignment file <b>{fileName}</b> already uploaded. You can replace it
          by uploading a new file or go back to Admin Dashboard.
        </p>
      );
    }
  }

  function handleNotification() {
    sendEmail(courseId)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    console.log(message + "...");
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <h2>Upload / Reload Assignment File</h2>
                <br />
                <br />

                <label className="form-label">
                  <b>Course Name</b> : &nbsp;&nbsp;&nbsp;&nbsp;{courseName}
                </label>
                <br />
                <label className="form-label">
                  <b>Duration</b> : &nbsp;&nbsp;&nbsp;&nbsp;{duration}
                </label>
                <br />
                <br />
                <label className="form-label">{checkFile()}</label>
                <br />
                <br />
                <label>
                  <b>Assignment File</b> : &nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                    type="file"
                    onChange={(e) => {
                      setFile(e.target.files ? e.target.files[0] : null);
                    }}
                  />
                </label>

                <br />
                <br />
                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>

                {progress.started && (
                  <progress max="100" value={progress.pc}></progress>
                )}
                {msg && <span>{msg}</span>}
                <br />
                <br />
                <button
                  className="btn btn-primary"
                  onClick={handleNotification}
                >
                  Notify Students
                </button>
                <br />
                <br />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navigator("/admin");
                  }}
                >
                  Instructor Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentComponent;
