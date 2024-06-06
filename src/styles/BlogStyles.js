"use client";
import styled from "styled-components";
import Link from "next/link";

const BlogPage = styled.div`
    padding: 20px;
    background-color: #242424; 
    color: #f5f5f5;
    width: 100%;

    @media (min-width: 768px) {
    width: 75%;
    }
`;

const PageTitle = styled.h1`
    font-size: 2.5em;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
`;

const YearTitle = styled.h2`
    font-size: 1.8em;
    color: #ccc;
    margin-top: 20px;
    text-align: center;
`;

const StyledLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: start;
    color: #f5f5f5;
    text-decoration: none;
    margin-bottom: 10px;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    &:hover {
        color: #5eddac;
    }
`;

const BlogTitle = styled.h3`
    font-size: 1.2em;
    margin: 0;
    margin-bottom: 5px;  

    @media (min-width: 768px) {
        margin-bottom: 0; 
    }
`;

const PublishDate = styled.h3`
    font-size: 1em;
    color: #5eddac;
    margin: 0;
`;

const Divider = styled.hr`
    border: none;
    height: 1px;
    background-color: #5eddac;
    margin-top: 10px;
`;

export { BlogPage, PageTitle, YearTitle, StyledLink, BlogTitle, PublishDate, Divider }