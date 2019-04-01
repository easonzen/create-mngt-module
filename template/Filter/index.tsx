import React, { Component } from 'react';
import { Input, Select, DatePicker, Radio, Checkbox, Form, Row, Col, Button } from 'antd';
import { FormItem, $Formutil, connect } from 'react-antd-formutil';
import moment from 'moment';
import './style.scss';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const CheckboxGroup = Checkbox.Group;

const radioOpts = [
    { label: 'Hangzhou', value: 'Hangzhou' },
    { label: 'Shanghai', value: 'Shanghai' },
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Chengdu', value: 'Chengdu' }
];
const checkboxOpts = [{ label: 'HTML', value: '1' }, { label: 'Javascript', value: '2' }, { label: 'CSS', value: '3' }];
const selectOpts = [{ label: '男', value: 'male' }, { label: '女', value: 'female' }];

const formItemLayout = {
    labelCol: {
        span: 24
    },
    wrapperCol: {
        span: 24
    }
};

interface IProps {
    onSubmit: (data?: any) => void;
    onReset: (data?: any) => void;
    $formutil?: $Formutil;
}

// @ts-ignore
@connect
class Filter extends Component<IProps> {
    onSubmit = e => {
        const { onSubmit } = this.props;

        e.preventDefault();

        onSubmit();
    };

    onReset = () => {
        const { onReset } = this.props;

        this.props.$formutil!.$reset(onReset);
    };

    render() {
        return (
            <Form className="filter-form" layout="inline" onSubmit={this.onSubmit}>
                <FormItem
                    className="form-item-block"
                    name="ability"
                    itemProps={{ ...formItemLayout, label: '职业技能' }}>
                    <CheckboxGroup options={checkboxOpts} />
                </FormItem>
                <FormItem className="form-item-block" name="place" itemProps={{ ...formItemLayout, label: '工作地点' }}>
                    <RadioGroup>
                        {radioOpts.map(item => (
                            <RadioButton key={item.value} value={item.value}>
                                {item.label}
                            </RadioButton>
                        ))}
                    </RadioGroup>
                </FormItem>
                <FormItem
                    className="form-item-inline"
                    name="username"
                    itemProps={{ ...formItemLayout, label: '用户名', required: true }}
                    required
                    validMessage={{
                        required: '请输入用户名'
                    }}>
                    <Input placeholder="请输入用户名" />
                </FormItem>
                <FormItem className="form-item-inline" name="gender" itemProps={{ ...formItemLayout, label: '性别' }}>
                    <Select placeholder="请选择性别">
                        {selectOpts.map(item => (
                            <Option key={item.value} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </FormItem>
                <FormItem
                    className="form-item-inline"
                    name="birth"
                    itemProps={{ ...formItemLayout, label: '出生日期' }}
                    $formatter={value => value && moment(value)}
                    $parser={value => value && moment(value).format('YYYY-MM-DD')}>
                    <DatePicker
                        style={{ width: '100%' }}
                        disabledDate={value => moment(value).valueOf() >= moment().valueOf()}
                    />
                </FormItem>
                <Row className="filter-btn-group">
                    <Col>
                        <Button className="filter-primary-btn" type="primary" htmlType="submit">
                            提交
                        </Button>
                        <Button type="danger" onClick={this.onReset}>
                            重置
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Filter;
