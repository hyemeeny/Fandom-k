import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import CardProfile from "./CardProfile";
import { LeftArrowButton, RightArrowButton } from "../ArrowButton";
import { getDonation } from "../../api/donations";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  position: relative;
  width: 1200px;
  display: flex;
  flex-direction: column;
  margin: auto;

  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .slick-prev,
  .slick-next {
    width: 40px;
    height: 78.33px;
  }

  .slick-prev {
    left: -70px;
  }

  .slick-next {
    right: -70px;
  }

  @media (min-width: 375px) {
    width: 327px;
    overflow: hidden;
  }

  @media (min-width: 768px) {
    width: 700px;
    overflow: hidden;
  }

  @media (min-width: 1200px) {
    width: 1200px;
    overflow: visible;
  }
`;

function DonationAwait() {
  const [donations, setDonations] = useState([]); // API에서 받아온 카드 목록
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  useEffect(() => {
    const fetchInitialDonations = async () => {
      try {
        const data = await getDonation();

        // 남은 날짜 수로 정렬
        const sortedData = data.list.sort((a, b) => {
          const aDaysLeft = Math.ceil(
            (new Date(a.deadline) - new Date()) / (1000 * 60 * 60 * 24),
          );
          const bDaysLeft = Math.ceil(
            (new Date(b.deadline) - new Date()) / (1000 * 60 * 60 * 24),
          );
          return aDaysLeft - bDaysLeft;
        });

        setDonations(sortedData);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    };

    fetchInitialDonations();
  }, []);

  const fetchMoreDonations = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await getDonation();
      const newDonations = data.list.filter(
        (item) => !donations.some((donation) => donation.id === item.id),
      );
      setDonations((prevDonations) => [...prevDonations, ...newDonations]);
    } catch (error) {
      console.error("더 많은 데이터를 가져오는데 실패했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <RightArrowButton />,
    prevArrow: <LeftArrowButton />,

    afterChange: (current) => {
      if (current + 4 >= donations.length) {
        fetchMoreDonations();
      }
    },

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3, // 3개의 슬라이드를 보여줌
          slidesToScroll: 1, // 1개의 슬라이드를 스크롤함
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // 2개의 슬라이드를 보여줌
          slidesToScroll: 1, // 1개의 슬라이드를 스크롤함
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1, // 1개의 슬라이드를 보여줌
          slidesToScroll: 1, // 1개의 슬라이드를 스크롤함
        },
      },
    ],
  };

  return (
    <div>
      <Container>
        <h2
          style={{
            color: "var(--white)",
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "24px",
          }}
        >
          후원을 기다리는 조공
        </h2>
        <Slider {...settings}>
          {donations.map((item) => (
            <CardProfile key={item.id} item={item} />
          ))}
        </Slider>
      </Container>
    </div>
  );
}

export default DonationAwait;
