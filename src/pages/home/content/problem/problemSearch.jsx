import React, { Component } from 'react';

import BaseForm from '../component/BaseForm';
import {
    Form,
    Select,
    Button,
    Input,
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
        console.log('formData', this.props)
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
                                onChange={(e) => { handleChangeItem('problemType', e)}}
                                disabled={disabled}
                            >
                                {!type ? <Option value="all">全部</Option> : ''}
                                <Option value="choice">单选题</Option>
                                <Option value="judgement">判断题</Option>
                                <Option value="multiple">多选题</Option>
                                <Option value="blank">填空题</Option>
                                <Option value="showAnswer">简答题</Option>
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
                                style={{ width: 180 }}
                                placeholder="请选择包含知识点"
                                value={formData.knowledgePoints || undefined}
                                onChange={(e) => { handleChangeItem('knowledgePoints', e)}}
                                disabled={(!formData.subject? true : false) && (!type ? false : true)}
                            >
                                {
                                    pointsList.map((item) => {
                                        return (
                                            <Option value={item.pointId}>{item.pointName}</Option>
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
                            {/* <Select
                                style={{ width: 180 }}
                                placeholder="请选择难度等级"
                                value={formData.difficultyLevel || undefined}
                                onChange={(e) => { handleChangeItem('difficultyLevel', e)}}
                                disabled={disabled}
                            >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">2</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select> */}
                            <Input
                                style={{ width: 180 }}
                                placeholder="请输入难度等级（0~1）"
                                value={formData.difficultyLevel || undefined}
                                onChange={(e) => { handleChangeItem('difficultyLevel', e.target.value)}}
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
                                <Option value="3">2</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
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
