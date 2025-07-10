"use client";
import "./error-message.scss";
export default function ErrorMessage({
  message = "Something went wrong",
  onRetry,
}) {
  return (
    <div className="error-message text-center py-5">
      <p className="error-message__title">{message} 😕</p>
      {onRetry && (
        <button onClick={onRetry} className="btn error-message__btn  mt-3">
          Try Again
        </button>
      )}
    </div>
  );
}
