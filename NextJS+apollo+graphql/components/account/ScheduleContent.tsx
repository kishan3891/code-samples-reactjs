import Loading from '@components/common/Loading';
import { Typography, Alert } from 'antd';
import { ScheduleCard } from '@components/account/ScheduleCard';
import useAuth from '../../hooks/useAuth';
import { MY_SCHEDULE, MyScheduleResults } from '../../queries/account';
import { useQuery } from '@apollo/client';
import moment from 'moment-timezone';
import { useState, useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Title } = Typography;
const LIMIT = 5;

export default function ScheduleContent() {
    const [page, setPage] = useState(1);
    const [end, setEnd] = useState(false);
    const today = moment().startOf('day');

    const { data, fetchMore } = useQuery<MyScheduleResults>(MY_SCHEDULE, {
        variables: {
            limit: LIMIT,
            offset: 0,
            today,
        },
        fetchPolicy: 'cache-and-network',
    });

    const loadMore = useCallback(() => {
        const nextPage = page + 1;
        setPage(nextPage);
        return fetchMore({
            variables: {
                limit: LIMIT,
                offset: (nextPage - 1) * LIMIT,
                today,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (fetchMoreResult.schedules.length < LIMIT) setEnd(true);
                return {
                    ...prev,
                    schedules: [...(prev.schedules || []), ...fetchMoreResult.schedules],
                };
            },
        });
    }, [fetchMore, today, setPage]);

    useEffect(() => {
        if (!end && data && !data.schedules.length) {
            setEnd(true);
        }
    }, [data, end, setEnd]);

    return (
        <div className="account__main__content">
            <div className="container">
                <div className="account__main__content__inner">
                    <Title level={4} className="center">
                        My Schedule
                    </Title>
                    {data?.schedules && data?.schedules.length > 0 ? (
                        <InfiniteScroll
                            dataLength={data?.schedules.length || 0} //This is important field to render the next data
                            next={loadMore}
                            hasMore={!end}
                            loader={<Loading spinning={true} style={{ width: '100%' }} />}
                        >
                            {data?.schedules.map(({ registrant, cohort, startTime, endTime, cancelled }, i) => {
                                return (
                                    <ScheduleCard
                                        key={`${i}`}
                                        cohort={cohort}
                                        registrant={registrant}
                                        startTime={startTime}
                                        endTime={endTime}
                                        cancelled={cancelled}
                                    />
                                );
                            })}
                        </InfiniteScroll>
                    ) : (
                        <Alert message="No schedule found!" type="error" />
                    )}
                    {/* {data?.schedules && data?.schedules.length > 0 && !end &&
                        <Row>
                            <Col span={24} className="center">
                                <button onClick={loadMore} className="button-primary" style={{ marginTop: 32 }}>
                                    {loading ? `Loading...` : `Show More`}
                                </button>
                            </Col>
                        </Row>
                    } */}
                </div>
            </div>
        </div>
    );
}
