import React, { Component, Fragment } from 'react';
import { Table, Button } from 'antd';
import Modal from 'components/Modal';
import Edit from '../Edit';

const btnStyle = {
    marginBottom: '20px'
};

interface IProps {
    loading: boolean;
    data: any[];
    pagination: any;
    onChange: (data: any) => void;
    onRefresh: (data?: any) => void;
}

class List extends Component<IProps> {
    columns = [
        {
            dataIndex: 'ldap_name',
            title: '登录名'
        },
        {
            dataIndex: 'real_name',
            title: '真实姓名'
        },
        {
            dataIndex: 'department',
            title: '部门',
            render: (text, record) => {
                let result;

                switch (text) {
                    case '1':
                        result = '部门1';
                        break;
                    case '2':
                        result = '部门2';
                        break;
                    case '3':
                        result = '部门3';
                        break;
                    default:
                        break;
                }

                return result;
            }
        },
        {
            key: 'action',
            title: '操作',
            render: (text, record) => {
                return (
                    <Button type="primary" size="small" onClick={() => this.edit(text)}>
                        更新
                    </Button>
                );
            }
        }
    ];

    edit = (text?: any) => {
        Modal.open({
            component: <Edit data={text ? text : undefined} />,
            title: text ? '更新' : '新建',
            width: 1000,
            closable: true,
            maskClosable: true
        }).result.then(
            resp => {
                if (resp) {
                    this.props.onRefresh();
                }
            },
            error => {
                return;
            }
        );
    };

    render() {
        const { loading, data, pagination, onChange } = this.props;

        const list =
            data && data.length > 0
                ? data.map((item, index) => ({
                      key: index,
                      ...item
                  }))
                : [];

        return (
            <Fragment>
                <Button style={btnStyle} type="primary" onClick={() => this.edit()}>
                    新建
                </Button>
                <Table
                    loading={loading}
                    dataSource={list}
                    pagination={pagination}
                    columns={this.columns}
                    onChange={onChange}
                />
            </Fragment>
        );
    }
}

export default List;
