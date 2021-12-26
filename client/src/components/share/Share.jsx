import './share.css'
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/user';
import FileBase from 'react-file-base64'
import Accordion from 'react-bootstrap/Accordion';


const Share = () => {
const [body,setBody]= useState('');

    const dispatch = useDispatch();
    
    const [post, setPost] = useState({
        userId: localStorage.getItem('userId'), 
        img: '',
        title: '',
        desc: ''
    });

    
    const handleSubmit = (e) => {
        // e.preventDefault();
        console.log(post.desc);
        dispatch(createPost(post))
        setPost({img:'',title:'',desc:''})
        return;
    }

    return (

        <Accordion className='acc'>
            <Accordion.Item  eventKey="0">
                <Accordion.Header>List A Job</Accordion.Header>
                <Accordion.Body>
                <form className="share" onSubmit={handleSubmit}>
                    <div className="shareTop">
                        <input className="titleInput input" placeholder="Job Title" autoComplete="off" type="text" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value})} />

                        <textarea className="descInput input" placeholder="Enter the job description and qualifications" value={post.desc} onChange={(e) => setPost({ ...post, desc: e.target.value})} />
                   
                    </div>
                    <div className="shareBottom">
                    
                        <button className="addPhoto">
                            <p style={{margin:'5px 10px 5px 0px'}}>Add the workspace:</p>    
                            <FileBase type='file' multiple={false} onDone={({ base64 }) =>  setPost( { ...post, img: base64} )} />
                        </button>
                        <button className="addPost" title="Post Job" type='submit'>
                            <PostAddIcon />
                        </button>
                    </div>
                </form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        
    )
}

{/* Share.modules={
    toolbar: [
        [{header:'1'}, {header:'2'},{header:[3, 4, 5, 6]},{ font:[]}],
        [{size:[]}],
        ['bold','italic','underline','strike','blockquote'],
        [{'link':'ordered'},{'link':'bullet'}]
        ['link']
    ]
}
Share.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'link'
] */}

export default Share
