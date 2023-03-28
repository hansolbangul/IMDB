import Spinner from '../../public/spinner.svg'
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}
