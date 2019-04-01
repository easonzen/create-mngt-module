import React, { Component } from 'react';
import Filter from './Filter';
import List from './List';
import { withForm, $Formutil } from 'react-antd-formutil';
import { message } from 'antd';
import request from './request';
import ErrorBox from 'components/ErrorBox';

interface IProps {
    $formutil: $Formutil;
}

// @ts-ignore
@withForm
class ModuleName extends Component<IProps> {
    state = {
        pageNo: 1,
        total: 0,
        pageSize: 10,
        loading: false,
        list: [],
        error: null
    };

    // componentDidMount() {
    //     this.getList();
    // }

    filterChange = () => {
        this.setState(
            {
                pageNo: 1,
                total: 0,
                pageSize: 10
            },
            this.getList
        );
    };

    getList = async () => {
        const { $params, $invalid, $getFirstError } = this.props.$formutil;
        const { pageNo, pageSize } = this.state;

        if ($invalid) {
            message.error($getFirstError());
        } else {
            this.setState({
                loading: true
            });

            try {
                const resp = await request.getList({
                    pageNo,
                    pageSize,
                    ...$params
                });
                const users = resp.data.users;

                this.setState({
                    list: users,
                    total: users.length
                });
            } catch (error) {
                this.setState({
                    error
                });
            }

            this.setState({
                loading: false
            });
        }
    };

    render() {
        const { pageNo, total, pageSize, loading, list, error } = this.state;

        return (
            <div className="ModuleName-module-wrap">
                <Filter onSubmit={this.filterChange} onReset={this.filterChange} />
                {error ? (
                    <ErrorBox error={error} onClick={this.getList} />
                ) : (
                    <List
                        loading={loading}
                        data={list}
                        onRefresh={this.getList}
                        onChange={({ current }) => {
                            this.setState(
                                {
                                    pageNo: current
                                },
                                this.getList
                            );
                        }}
                        pagination={
                            total > pageSize
                                ? {
                                      pageSize,
                                      current: pageNo,
                                      total,
                                      showQuickJumper: true,
                                      size: 'small'
                                  }
                                : false
                        }
                    />
                )}
            </div>
        );
    }
}

export default ModuleName;
