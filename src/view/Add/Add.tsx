
import React from 'react';
import './Add.css';
import NoteService from './../../service/Note'
import ImagePickerExample from './ImagePickerExample/ImagePickerExample'

export interface Props {
}
export interface noteData {
    [index:number]:any,
    map(param: (item:any,index:number) => any): any;
}
export interface State {
    noteData:noteData
}

export interface sss {
    noteCover:number,
    avatar:number,
    author:number,
    noteId:number,
    likeNum:number,
    noteTitle:number
}


class Add extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            noteData:[
            ]
        };
    }
    fn(files:any){
        console.log(files[0])
        // console.log(files)
        let formData = new FormData();
        formData.append('file',files[0])
        NoteService.AddNote(formData).then(res=>{
            console.log(res)
        })
        // console.log(document.getElementById('pic'))
    }
    render() {
        return (
            <div className={'add'}>
                <ImagePickerExample></ImagePickerExample>
            </div>
        );
    }
    componentDidMount(): void {
    }
}

export default Add
