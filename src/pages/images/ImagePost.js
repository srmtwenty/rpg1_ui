import axios, {post} from 'axios';
import {React, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import authHeader from '../../services/auth-header';

function ImagePost(){
    const [file, setFile]=useState(null);
    //const [description, setDescription]=useState("");
    const navigate=useNavigate()

    let axiosConfig={
        headers: {
            
            'content-type': 'multipart/form-data'
        }
    }
    const onFormSubmit=(e)=>{
        e.preventDefault();
        //file.description=description;
        var postData=new FormData();
        //var input = document.querySelector('input[type="file"]')

        postData.append('file', file)
        console.log(postData)
        //var data = new FormData()
        //data.append('file', input.files[0])
        //console.log(data);
        
        axios.post("http://localhost:8080/files/upload", postData, {headers:authHeader()},axiosConfig)
            .then(res=>{
                setFile(res.data)
                console.log(res.data)
                navigate("/images")
            })
            .catch(err=>console.log(err))
    }

    return(
        <>
          <div className="profile_wrap2">
                <div className="profile_grid1">
                    <h2>Upload Image</h2>
                    <div className="labelsPost">
                        <form onSubmit={onFormSubmit} className="form">
                            <div className="row2">
                                
                                <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                            </div>
                            <div className="updateButtonsWrap">
                                <div className="updateButtonSubmit">
                                    <input type="submit" value="Upload File"/>
                                </div>
                            </div>
                        
                        </form>
                    </div>
                    <div className="createLink">
                        <Link className="link" to="/images">Back to List</Link>
                    </div>
                    
                </div>
            </div>
          
        </>
    )
}
export default ImagePost;
/*
class ImagePost extends React.Component {
    
    constructor(props) {
      super(props);
      this.state ={
        file:null
      }
      this.onFormSubmit = this.onFormSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.fileUpload = this.fileUpload.bind(this)
    }
  
    onFormSubmit(e){
      e.preventDefault() // Stop form submit
      this.fileUpload(this.state.file).then((response)=>{
        console.log(response.data); 
      })
      
    }
  
    onChange(e) {
      this.setState({file:e.target.files[0]})
    }
  
    fileUpload(file){
      const url = 'http://localhost:8080/files/upload';
      const formData = new FormData();
      formData.append('file',file)
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      return axios.post(url, formData,config)
    }
  
    render() {
      return (
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
     )
    }
  }
  
  
  
  export default ImagePost
/*
function ImagePost(){
    const [file, setFile]=useState();
    //const [name, setName]=useState("");
    //const [size, setSize]=useState(0);
    //const [type, setType]=useState("");

    const navigate=useNavigate()
    const postImage=(e)=>{
        e.preventDefault();

        
        var input = document.querySelector('input[type="file"]')
      
        var data = new FormData()
        data.append('file', input.files[0])
        console.log(data);
        
        axios.post("http://localhost:8080/files/upload", {data:data
        })
            .then(res=>navigate("/files"))
            .catch(err=>console.log(err))
    }

    return(
        <>
            <h2>Post Image</h2>
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}
export default ImagePost;*/