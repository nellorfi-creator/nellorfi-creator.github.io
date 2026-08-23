"use client";

import { useEffect, useState } from "react";
import {
  GOOGLE_REVIEW_AVERAGE,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
  googleReviews,
  type GoogleReview,
} from "@/lib/google-reviews";

function Stars({ rating }: { rating: GoogleReview["rating"] }) {
  return (
    <p className="review-stars" aria-label={`${rating} stelle su 5`}>
      {"★".repeat(rating)}
      <span aria-hidden="true">{"☆".repeat(5 - rating)}</span>
    </p>
  );
}

export default function SocialProofReviews() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth <= 760 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const pageCount = Math.ceil(googleReviews.length / perPage);
  const visible = googleReviews.slice(page * perPage, page * perPage + perPage);

  const goPrev = () => setPage((current) => (current - 1 + pageCount) % pageCount);
  const goNext = () => setPage((current) => (current + 1) % pageCount);

  return (
    <div className="social-proof-reviews">
      <div className="social-proof-score reveal">
        <strong>{GOOGLE_REVIEW_AVERAGE.toFixed(1)}</strong>
        <div>
          <Stars rating={5} />
          <span>{GOOGLE_REVIEW_COUNT} recensioni su Google</span>
        </div>
        <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
          Leggi tutte su Google Maps <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="social-proof-carousel reveal" aria-live="polite">
        <div className="social-proof-grid">
          {visible.map((review) => (
            <figure className="social-proof-card" key={review.id}>
              <Stars rating={review.rating} />
              <blockquote>“{review.text}”</blockquote>
              <figcaption>
                <strong>{review.author}</strong>
                {review.relativeDate ? <span>Recensione Google · {review.relativeDate}</span> : <span>Recensione Google</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        {pageCount > 1 ? (
          <div className="social-proof-nav" aria-label="Scorri le recensioni">
            <button type="button" onClick={goPrev} aria-label="Recensioni precedenti">
              ←
            </button>
            <div className="social-proof-dots" role="tablist" aria-label="Pagine recensioni">
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === page}
                  aria-label={`Pagina recensioni ${index + 1} di ${pageCount}`}
                  className={index === page ? "is-active" : undefined}
                  onClick={() => setPage(index)}
                />
              ))}
            </div>
            <button type="button" onClick={goNext} aria-label="Recensioni successive">
              →
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
