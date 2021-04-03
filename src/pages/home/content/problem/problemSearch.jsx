import React, { Component } from 'react';

import BaseForm from '../component/BaseForm';
import {
    Form,
    Select,
    Button,
    Input,
    InputNumber,
} from 'antd';
import './index.css';
const { Option } = Select;

export default class app extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {
            handleChangeItem,
            formData,
            handleSubmit,
            check,
            disabled,
            type,
            require,
            pointsList,
            subjectsList,
        } = this.props;
        return (
            <div>
                <Form
                    name="basic"
                    layout="inline"
                    initialValues={formData}
                    required={require}
                    className="search-item"
                >
                    <Form.Item
                        label="题目类型"
                        name="problemType"
                        required={require}
                    >
                        <BaseForm
                            warning={check.problemType} 
                            required={require}
                            requireStyle
                        >
                            <Select
                                style={{ width: 180 }}
                                value={formData.problemType || undefined}
                                defaultValue="all"
                                onChange={(e) => { handleChangeItem('problemType', e)}}
                                disabled={disabled}
                            >
                                {!type ? <Option value="all">全部</Option> : ''}
                                <Option value="choice">单选题</Option>
                                <Option value="judgement">判断题</Option>
                                <Option value="multiple">多选题</Option>
                                <Option value="blank">填空题</Option>
                                <Option value="shortAnswer">简答题</Option>
                            </Select>
                        </BaseForm>
                    </Form.Item>

                    <Form.Item
                        label="课程"
                        name="subject"
                        required={require}
                    >
                        <BaseForm 
                            warning={check.subject}
                            required={require}
                            requireStyle
                        >
                            <Select 
                                style={{ width: 180 }}
                                placeholder="请选择课程"
                                value={formData.subject || undefined}
                                onChange={(e) => { handleChangeItem('subject', e)}}
                                disabled={disabled}
                            >
                                {!type ? <Option value="">全部</Option> : ''} 
                                {
                                    subjectsList.map((item) => {
                                        return (
                                            <Option value={item.subjectId}>{item.subjectName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </BaseForm>
                    </Form.Item>
                    
                    <Form.Item
                        label="包含知识点"
                        name="knowledgePoints"
                        required={require}
                    >
                        <BaseForm
                            warning={check.knowledgePoints}
                            required={require}
                            requireStyle
                        >
                            <Select
                                style={{ width: 240 }}
                                mode="multiple"
                                optionLabelProp="label"
                                placeholder="请选择包含知识点"
                                value={formData.knowledgePoints || undefined}
                                onChange={(e) => { handleChangeItem('knowledgePoints', e)}}
                                disabled={(!formData.subject? true : false) && (!type ? false : true)}
                            >
                                {
                                    pointsList.map((item) => {
                                        return (
                                            <Option value={item.pointId} label={item.pointName}>
                                                <div className="demo-option-label-item">
                                                    <span role="img" aria-label={item.pointName}>
                                                        {item.pointName}
                                                    </span>
                                                    <span style={{ float: 'right'}}>
                                                        ({item.chapter})
                                                    </span>
                                                </div>
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </BaseForm>
                    </Form.Item>

                    <Form.Item
                        label="难度等级"
                        name="difficultyLevel"
                        required={require}
                    >
                        <BaseForm
                            warning={check.difficultyLevel}
                            required={require}
                            requireStyle
                        >
                            <InputNumber
                                min={0.1}
                                max={1}
                                style={{ width: 180 }}
                                placeholder="请输入难度等级（0~1）"
                                value={formData.difficultyLevel || undefined}
                                onChange={(e) => { handleChangeItem('difficultyLevel', e)}}
                                disabled={disabled}
                            />
                        </BaseForm>
                    </Form.Item>
                    
                    <Form.Item
                        label="题目分数"
                        name="difficultyLevel"
                        required={require}
                    >
                        <BaseForm
                            warning={check.score}
                            required={require}
                            requireStyle
                        >
                            <Select
                                style={{ width: 180 }}
                                placeholder="请选择题目分数"
                                value={formData.score || undefined}
                                onChange={(e) => { handleChangeItem('score', e)}}
                                disabled={disabled}
                            >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="20">20</Option>
                            </Select>
                        </BaseForm>
                    </Form.Item>

                    <Form.Item className="problems_layout">
                        {
                            !type ? 
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => { handleSubmit() }}
                            >
                                查询
                            </Button> : ''
                        }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
