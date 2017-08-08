/**
 * Created by Administrator on 2017/8/8.
 */
import React, { Component } from 'react';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class Content extends Component {
    constructor(){
        super()
        this.state={
            news:{}
        }
    }
    componentDidMount(){
        $.ajax({
            url:"http://localhost:8005/news/news1",
            type:"post",
            data:{
                id:this.props.match.params.id.split(":")[1]
            },
            success:function (e){
                this.setState({
                    news:e[0]
                })
            }.bind(this)
        })
    }
    render() {
        return <div className="content">
            {this.state.news.content}
            </div>
    }
}
export default Content;