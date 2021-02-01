import React, { Component } from 'react';
import {
    Input,
    Radio,
} from 'antd';

const { TextArea } = Input;

export default class renderProblem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    
    render() {
        const {
            field,
            onChangeItem,
        } = this.props;
        let nodeModal;
      	// 判断组件类型
        switch (field.problemType) {
            case 'choice':
                nodeModal = (
                    <Radio.Group
                        value={field.answer}
                        onChange={(e) => {
                            onChangeItem('answer', e.target.value);
                        }}
                    >
                        <Radio value="A">A.{field.choiceOptionA}</Radio>
                        <Radio value="B">B.{field.choiceOptionB}</Radio>
                        <Radio value="C">C.{field.choiceOptionC}</Radio>
                        <Radio value="D">D.{field.choiceOptionD}</Radio>
                    </Radio.Group>
                );
                break;
            case 'blank':
                nodeModal = (
                    <Input
                        value={field.answer}
                        style={{ width: '80%' }}
                        placeholder="请输入正确答案。（多个答案请用逗号隔开）"
                        onChange={(e) => {
                            onChangeItem('answer',e.target.value);
                        }}
                    />
                );
                break;
            case 'judgement':
                nodeModal = (
                    <Radio.Group
                        value={field.answer}
                        onChange={(e) => {
                            onChangeItem('answer', e.target.value);
                        }}
                    >
                        <Radio value="true">对</Radio>
                        <Radio value="false">错</Radio>
                    </Radio.Group>
                );
                break;
            case 'shotAnswer':
                nodeModal = (
                    <TextArea
                        style={{ marginTop: 5 , width: '80%'}}
                        className="problems_input_layout"
                        placeholder={`请输入的此题答案`}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        value={field.answer}
                        onChange={(e) => {
                            onChangeItem('answer', e.target.value);
                        }}
                    />
                );
                break;
            default:
                nodeModal = '';
        }
        return (
            <div>
                {nodeModal}
            </div>
        );
    }
}