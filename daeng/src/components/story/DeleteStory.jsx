import React from 'react'
import axios from 'axios'
import styled from "styled-components";
import AlertDialog from '../../components/commons/SweetAlert';

const DeleteMenu = styled.div`
  position: absolute;
  top: 10px; 
  left: -50px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  z-index: 10;
`;

const DeleteMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #333;
  padding: 5px;
  cursor: pointer;
  width: 100%;
`;

const handleDelete = () => {
  AlertDialog({
    mode: "alert",
    title: "성공",
    text: `스토리가 성공적으로 삭제되었습니다.`,
    confirmText: "닫기" 
  });
  setShowDeleteMenu(false); 
};

function DeleteStory() {
  return (
    <>
    <DeleteMenu>
      <DeleteMenuButton onClick={handleDelete}>삭제</DeleteMenuButton>
    </DeleteMenu>
    </>
  )
}

export default DeleteStory
