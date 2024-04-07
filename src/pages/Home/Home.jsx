import { useEffect, useState } from "react";
import { useGetNewsListQuery } from "../../store/service/news";
import { Button, Input, Space } from 'antd';

// assets
import image1 from "../../assets/images/image1.webp"
import image2 from "../../assets/images/image2.webp"
import image3 from "../../assets/images/image3.jpg"
import image4 from "../../assets/images/image4.jpg"
import image5 from "../../assets/images/image5.jpg"

//styles
import "./_index.scss"
import { ListCard, Loader } from "../../components";
import { CaretRightOutlined, FacebookFilled, GooglePlusSquareFilled, LinkedinFilled, MailFilled, TwitterSquareFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";


// Array of fallback images (Because the api doesn't have any 🥲)
const fallbackImages = [
    image1,
    image2,
    image3,
    image4,
    image5
];
const Home = () => {
    // Get data from API 
    const { data: newsList, isLoading } = useGetNewsListQuery()
    const [data, setData] = useState([])

    // Date config (to display num of past days)
    const getDaysAgo = (date) => {
        const currentDate = dayjs();
        const givenDate = dayjs(date);
        const diffInDays = currentDate.diff(givenDate, 'day');
        return diffInDays;
    };
    useEffect(() => {
        if (!isLoading) {
            const newsListData = newsList?.articles.map((obj, index) => ({
                ...obj,
                urlToImage: obj.urlToImage === null ? fallbackImages[index % fallbackImages.length] : obj.urlToImage
            }));
            setData(newsListData)
        }

    }, [isLoading])
    return (
        isLoading ? <Loader /> :
            <div className="ctr">
                {/* Start Latest News */}
                <h1 className="text-center my-5 heading__black "> Latest News </h1>
                <div className="home-grid">
                    {/* Start News (Left side ) */}
                    <div className="home-grid_mini">
                        {/* Main Card */}
                        <div className="d-flex flex-column gap-2 recent-news">
                            <ListCard
                                mainCard
                                item={data?.[0]}
                                tag="Mustread"
                                className="d-flex flex-column main-card h-100"
                            />
                        </div>

                        {/* Small Cards */}
                        <div className="recent-news-sm">
                            <ListCard
                                item={data?.[1]}
                                tag="tech"
                                className="d-flex flex-column list-card_sm"
                            />
                            <ListCard
                                item={data?.[2]}
                                tag="Social Media"
                                className="d-flex flex-column list-card_sm"
                            />
                        </div>

                        {/* Start Editor Picks */}
                        <div className="editor-picks">
                            <p className="my-2 fs-20">   Editor&apos;s picks </p>

                            <div className="d-flex flex-column">
                                {data?.slice(0, 4).map((item, index) => (
                                    <ListCard
                                        showPastDay
                                        getDaysAgo={getDaysAgo}
                                        tag="mustread"
                                        key={index}
                                        item={item}
                                        className="d-flex flex-row br__bottom py-3"
                                    />
                                ))}
                            </div>
                        </div>
                        {/* End Editor Picks */}
                    </div>
                    {/* End News (Left side ) */}

                    {/* Start Side Content (Right side ) */}
                    <div className="d-flex flex-column gap-5">
                        {/* Recent Posts */}
                        <div className="border__muted p-4 ">
                            <p className="text__primary my-2 fs-20"> Recent Post</p>
                            {data?.slice(0, 3).map((item, index) => (
                                <ListCard
                                    recent
                                    getDaysAgo={getDaysAgo}
                                    key={index}
                                    item={item}
                                    className="d-flex flex-row br__bottom"
                                />
                            ))}
                        </div>
                        {/* Most Popular */}
                        <div className="border__muted p-4 ">
                            <p className="text__primary my-2 fs-20"> 5 Most Popular </p>
                            <ol className="px-5">
                                {data?.slice(0, 5).map((item, index) => (
                                    <li key={index}>
                                        {item?.title}
                                    </li>
                                ))}
                            </ol>
                        </div>


                        {/* Start  NewsLetter */}
                        <div className="border__muted p-4">
                            <p className="text__primary m-0 fs-20 text-center"> Good News Letter </p>
                            <p> Subscribe to our email newsletter for good news.
                                Sent out every Monday.</p>

                            <Space.Compact
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Input placeholder="Email" style={{ borderRadius: 0 }} />
                                <Button type="primary">Subscribe</Button>
                            </Space.Compact>
                        </div>
                        {/* End NewsLetter */}


                        {/* Start Follow Us  */}
                        <div className="border__muted p-4">
                            <p className="mb-2 fs-20"> Follow Us </p>
                            <div className="d-flex flex-row gap-1 flex-nowrap align-items-center">
                                <FacebookFilled style={{ color: "#3c5b93", fontSize: "40px" }} />
                                <TwitterSquareFilled style={{ color: "#20c0ee", fontSize: "40px" }} />
                                <GooglePlusSquareFilled style={{ color: "#db4b32", fontSize: "40px" }} />
                                <span style={{ backgroundColor: "#ce1410", height: "35px", width: "35px" }}>
                                    <CaretRightOutlined style={{ color: "#fff", fontSize: "35px" }} />
                                </span>
                                <LinkedinFilled style={{ color: "#007cb3", fontSize: "40px" }} />
                                <GooglePlusSquareFilled style={{ color: "#db4b32", fontSize: "40px" }} />

                            </div>
                        </div>
                        {/* End Follow Us  */}
                    </div>
                    {/* End Side Content (Right side ) */}
                </div>
                {/* End Latest News */}
                <hr />

                {/* Start Trending  */}
                <p> Trending </p>
                <div className="row">
                    {data?.slice(0, 4).map((item, index) => (
                        <div className="col-md-3 col-12" key={index}>
                            <ListCard
                                tag={dayjs(item?.publishedAt).format("MMMM DD YYYY")}
                                item={item}
                                className="d-flex flex-column list-card_sm border-bottom fw-semibold fs-16"
                            />
                            {data?.slice(0, 3).map((item, index) => (
                                <Link to={`/article/${item?.title}`} state={{ item: item }} key={index} className="d-block border-bottom py-3">
                                    <p className="text__muted fs-14 m-0"> {dayjs(item?.publishedAt).format("MMMM DD YYYY")} </p>
                                    <p> {item?.title}</p>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
                {/* End Trending  */}
            </div>
    )
}

export default Home