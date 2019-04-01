import React, { Component, Fragment } from 'react';
import Debug from 'components/Debug';
import { Row, Col, Button } from 'antd';

const btnStyle = {
    marginRight: '12px'
};

interface IProps {
    data: any;
    close?: (data?: any) => void;
    dismiss?: (data?: any) => void;
}

class Detail extends Component<IProps> {
    render() {
        const { data } = this.props;

        return (
            <Fragment>
                <Debug title="修改数据" data={data} />
                <Row>
                    <Col>
                        <Button style={btnStyle} type="primary" onClick={() => this.props.close!('modified data')}>
                            提交
                        </Button>
                        <Button type="danger" onClick={() => this.props.close!()}>
                            取消
                        </Button>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Detail;
