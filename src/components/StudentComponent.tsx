import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findStudent } from "../services/StudentService";
import axios from "axios";

const StudentComponent = () => {
  const { email } = useParams();
  const [studentId, setStudentId] = useState();
  const [studentName, setStudentName] = useState("");
  const [courseEnrolled, setCourseEnrolled] = useState("");
  const [grade, setGrade] = useState(0);
  const [emailId, setEmailId] = useState();
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log(email);

    const userDto = { email };
    console.log(userDto);
    findStudent(userDto).then((response) => {
      setStudentId(response.data.studentId);
      setStudentName(response.data.studentName);
      setCourseEnrolled(response.data.courseName);
      setGrade(response.data.grade);
      setEmailId(response.data.email);
      setFileName(response.data.fileName);
    });
  }, [email]);

  function checkFile() {
    if (fileName) {
      return (
        <p>
          Assignment file <b>{fileName}</b> already uploaded.
        </p>
      );
    }
  }

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
      .post(`http://localhost:8080/uploadFile/${studentId}`, fd, {
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
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
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

  return (
    <div
      className="container"
      style={{ backgroundColor: "#d4eef2", height: "700px" }}
    >
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-body ">
            <form>
              <div className="form-group mb-2">
                <h2>Welcome {studentName} !!</h2>
                <br />
                <label className="form-label">
                  <b>Student Name</b> : &nbsp;&nbsp;&nbsp;&nbsp;{studentName}
                </label>
                <br />
                <label className="form-label">
                  <b>Email</b> : &nbsp;&nbsp;&nbsp;&nbsp;{emailId}
                </label>
                <br />
                <label className="form-label">
                  <b>Course Enrolled</b> : &nbsp;&nbsp;&nbsp;&nbsp;
                  {courseEnrolled}
                </label>
                <br />
                <label className="form-label">
                  <b>Grade</b> : &nbsp;&nbsp;&nbsp;&nbsp;{grade}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentComponent;
