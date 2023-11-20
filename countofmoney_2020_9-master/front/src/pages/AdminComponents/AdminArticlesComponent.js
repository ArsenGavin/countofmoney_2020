import React, {useEffect, useState} from 'react';
import { Table, Button, Checkbox } from 'rsuite';
import {LOGIN} from "../../types";
import {openNotification} from "../../actions/notifications";

const { Column, HeaderCell, Cell } = Table;

const AdminArticleSummary = ({ title, summary }) => (
    <div>
      <label>{title}</label>
      <div
        style={{
          fontSize: 18,
          color: '#2eabdf'
        }}
      >
        {summary}
      </div>
    </div>
  );


export const AdminArticlesComponent = () => {
    // const [ user, setUser ] = useState(tableData);
    const [RssFeeds, setRssFeeds] = useState();
    const [check, setCheck] = useState([]);

    const fetchRss = () => {
        fetch(`${process.env.REACT_APP_API_URL}/rssfeed/`, {
            method: 'GET',
            credentials: "include",
        }).then(res => {
            res.json().then(result => {
                setRssFeeds(result);
            })
                .catch(error => console.log(error));
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        fetchRss();
    }, []);

    const changeRssFeedState = (checked, id) => {
        fetch(`${process.env.REACT_APP_API_URL}/rssfeed/${id}`, {
            method: 'PUT',
            credentials: "include",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                id,
                enabled: checked
            })
        })
            .then(res => {
                fetchRss();
            })
            .catch((err) => {
                throw err;
            })
    }

    return (
        <div>
            <div className="container-list-article">
                {RssFeeds && <Table headerHeight={80} autoHeight={true} data={RssFeeds}>
                    <Column width={200} align="left">
                    <HeaderCell>
                        <AdminArticleSummary title="Articles" summary={RssFeeds.length}/>
                    </HeaderCell>
                        <Cell dataKey="name"/>
                    </Column>
                    <Column width={120}>
                        <HeaderCell>Enable</HeaderCell>
                        <Cell dataKey="user">
                            {rowData => {
                                return (
                                    < Checkbox
                                        checked={rowData.enabled}
                                        onChange={(value, checked, event) => {
                                            changeRssFeedState(checked, rowData._id)
                                        }}
                                    /> 
                                )
                            } }
                        </Cell>
                    </Column>
                </Table>}
            </div>
        </div>
    )
}
