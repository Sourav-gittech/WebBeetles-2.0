import React from 'react'
import CategoryDetailsBanner from '../../components/student/category-details/CategoryDetailsBanner'
import CategoryBio from '../../components/student/category-details/CategoryBio'
import RelatedCourse from '../../components/student/category-details/RelatedCourse'
import { useParams } from 'react-router-dom'
import { encodeBase64Url } from '../../util/encodeDecode/base64'

const CategoryDetails = () => {
    const { categoryId } = useParams();
    const categoryName = encodeBase64Url(categoryId);
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