'use strict';
import { Row, Col } from 'antd';
import DropDownFilter from '@components/common/DropDownFilter';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GetCourseOptionsResults, GET_COURSE_OPTIONS } from 'queries/courses';
import { useRouter } from 'next/router';
import classnames from 'classnames';

interface Props {
    onChangeGradeBox: (boolean) => void;
    onChangeSubjectBox: (boolean) => void;
}
export default function CoursesFilter({ onChangeGradeBox, onChangeSubjectBox }: Props) {
    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [sticky, setSticky] = useState(false);

    const { data: courseOptions } = useQuery<GetCourseOptionsResults>(GET_COURSE_OPTIONS, {
        onCompleted: () => {
            setGrades(courseOptions.grades);
            setSubjects(courseOptions.subjects);
        },
    });

    //console.log(courseOptions)

    const ref = React.useRef<HTMLInputElement>(null);

    const onChangeGrade = (value) => {
        onChangeGradeBox(value);
    };

    const onChangeSubject = (value) => {
        onChangeSubjectBox(value);
    };

    useEffect(function mount() {
        function onScroll() {
            const headerHeight = document.getElementById('header').clientHeight;
            if (window.scrollY + headerHeight >= ref.current.offsetTop) setSticky(true);
            else setSticky(false);
        }
        window.addEventListener('scroll', onScroll);
        return function unMount() {
            window.removeEventListener('scroll', onScroll);
        };
    });

    const router = useRouter();
    const gradeQuery: any = router.query.grade || 0;
    const subjectQuery = (router.query.subject as string) || 'All';

    return (
        <div ref={ref} id="filters" className={classnames('filters', sticky && 'sticky')}>
            <div className="divider"></div>
            <div className="courses-filter" id="courses-filter">
                <div className="container">
                    <Row>
                        <Col xl={6} lg={8} md={8} sm={12} xs={24}>
                            <DropDownFilter
                                onChange={onChangeGrade}
                                placeholder="All Grades"
                                name="grade"
                                options={grades}
                                selected={parseInt(gradeQuery)}
                                defaultValue={{ id: 0, name: 'All Grades' }}
                            />
                        </Col>
                        <Col xl={6} lg={8} md={8} sm={12} xs={24}>
                            <DropDownFilter
                                onChange={onChangeSubject}
                                placeholder="All Subjects"
                                options={subjects}
                                selected={subjectQuery}
                                name="subject"
                                defaultValue={{ id: 'All', name: 'All Subjects' }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}
