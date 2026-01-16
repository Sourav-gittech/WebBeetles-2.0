import React from 'react'
import CategoryDetailsBanner from '../../components/student/category-details/CategoryDetailsBanner'
import CategoryBio from '../../components/student/category-details/CategoryBio'
import RelatedCourse from '../../components/student/category-details/RelatedCourse'
import { useParams } from 'react-router-dom'

const CategoryDetails = () => {
    const { categoryName } = useParams();
    // console.log('Category Name', categoryName);

    return (
        <>
            <CategoryDetailsBanner />
            <CategoryBio categoryName={categoryName} />
            <RelatedCourse categoryName={categoryName} />
        </>
    )
}

export default CategoryDetails