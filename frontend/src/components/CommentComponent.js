import { useState } from "react";
import Save from '../GRUPOMANIA IMG/save.svg'
import { dateFormat } from "../utils/utils";
import { Link } from "react-router-dom"
import UserDefault from '../GRUPOMANIA IMG/userDefault.png'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";

const CommentComponent = ({ comment, userId, onDeleteComment, onUpdateComment }) => {
    const [editedComment, setEditedComment] = useState('');
    const [canEdit, setCanEdit] = useState(false)
    const handleEditComment = (comment) => {
        setCanEdit(true);
        setEditedComment(comment?.comment)
    };
    return (
        <div className='coments-to' key={comment.id}>
            <div className='coments-in'>
                <Link to={"/perfile/" + comment?.User?.id}>
                    <div className="comments-user">

                        {comment.User.image === null ? (
                            <img className='svgcoments' src={UserDefault} alt='fotoUser' />
                        ) :
                            (
                                <img src={comment.User.image} className='svgcoments' alt='userPhoto' />
                            )}
                        <div className="comment-user-comment">{comment.User.firstName} {comment.User.lastName}  </div>
                    </div>
                </Link>
                {canEdit ? (
                    <div className='inputEdit' >
                        <input
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                        />
                        <button onClick={() => {
                            setCanEdit(false)
                            onUpdateComment(comment.id, editedComment)
                        }}><img className='button-save' src={Save} alt='haha' /></button>
                    </div>
                ) : (
                    <>
                        <div className='input-com'>
                            {comment.comment}
                        </div>
                        <div className="data">
                            {dateFormat(comment.createdAt)}
                        </div>
                    </>
                )}
            </div>
            {comment.userId === userId && (
                <div className='editB'>
                    <button className='button-comments1' onClick={() => handleEditComment(comment)}><CiEdit /></button>
                    <button className='button-comments' onClick={() => onDeleteComment(comment.id)}><MdOutlineDeleteForever />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentComponent;