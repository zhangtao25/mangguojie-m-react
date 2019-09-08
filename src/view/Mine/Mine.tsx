import React from 'react';
import './Mine.css';
import touxiang from './../../assets/images/touxiang.jpg'
import UserService from './../../service/User'

export interface Props {
}
export interface listArr {
    [index:number]:any
    map(param: (item:any,index:any) => any): any;
}
export interface State {
    listArr: listArr,
    info:any
}


class Mine extends React.Component<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            listArr:[
                {name:'关注',num:29},
                {name:'粉丝',num:3},
                {name:'获赞与收藏',num:6},
            ],
            info:{

            }
        };
    }
    render() {
        return (
            <div>
                <div className="mine-header">
                    <i className={'iconfont icon-list'}/>
                    <div>
                        <p>{this.state.info.user_nickname}</p>
                        <p>小红书号：{this.state.info.user_id}</p>
                    </div>
                    <i className={'iconfont icon-send'}/>
                </div>
                <div className="operate-top">
                    <div className='avatar'>
                        <img src={touxiang} alt=""/>
                    </div>

                    <div className='right'>
                        <ul>
                            {this.state.listArr.map((item,index)=>{
                                return (
                                    <li key={index}>
                                        <p>{item.num}</p>
                                        <p>{item.name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                        <ul>
                            <li>编辑资料</li>
                            <li>
                                <i className={'iconfont icon-set'}></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount(): void {
        UserService.getUserInfo().then((res:any)=>{
            console.log(res)
            this.setState({info:res.response})
        })
    }
}

export default Mine
