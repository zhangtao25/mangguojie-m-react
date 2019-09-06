import React from 'react';
import NoteService from './../../../service/Note'
import './NoteDetail.css'
import {RouteComponentProps} from 'react-router-dom'
import { Carousel, WingBlank,Icon} from 'antd-mobile';
import {observer, inject} from 'mobx-react';

export interface Propsx {
    match:any,
    store:any
}
type Props = Propsx&RouteComponentProps
export interface Data {
    [index:number]:any,
    map(param: (item:any,index:number) => any): any;
}
export interface State {
    item:any,
    data:Data,
    imgHeight:any
}

// 观察者
@inject('store')
@observer
class Note extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            item:"",
            data: [],
            imgHeight: 10,
        };
    }
    render() {
        return (
            <div className={'note'}>
                <Icon style={{marginTop:'10px',marginBottom:'10px'}} type={'left'} onClick={()=>{this.props.history.goBack();this.props.store.changeIsShowHome('block');}}/>
                <WingBlank>
                    <Carousel
                        autoplay={false}
                        infinite
                    >
                        {this.state.data.map(val => (
                            <div
                                key={val}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={'/api/static/notes/'+this.state.item.id+'/images/'+val}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </WingBlank>
                <div className="content">
                    <p>{this.state.item.title}</p>
                    <p>{this.state.item.desc}</p>
                </div>
            </div>
        );
    }
    componentDidMount(): void {
        let id = this.props.match.params.id
        NoteService.getNoteById(id).then((res:any)=>{
            this.setState({item:res[0]})
            setTimeout(() => {
                this.setState({
                    data: res[0].images.split(","),
                });
            }, 100);
        })
    }
}

export default Note