/* eslint-disable react/prop-types */
function Form({ handleSubmit, formData, handleChange, isLoading }) {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <label className="block font-semibold text-sm mb-2">First Name</label>
          <input
            className="w-full p-2 rounded bg-[#323644] white focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-[#00ADB5]"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block font-semibold text-sm mb-2">Last Name</label>
          <input
            className="w-full p-2 rounded bg-[#323644] text-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-[#00ADB5]"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label className="block font-semibold text-sm mb-2">
          Total Price in Rupees
        </label>
        <input
          className="w-full p-2  rounded bg-[#323644] text-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-[#00ADB5]"
          name="totalprice"
          placeholder="Total Price"
          type="number"
          value={formData.totalprice}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="depositpaid"
          checked={formData.depositpaid}
          onChange={handleChange}
          className="mr-2 w-4 h-4 bg-gray-100 border-gray-300 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-[#00ADB5]"
        />
        <label className="font-semibold">Deposit Paid</label>
      </div>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <label className="block font-semibold text-sm mb-2">
            Check-In Date
          </label>
          <input
            className="w-full p-2  rounded bg-[#323644] text-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-[#00ADB5]"
            name="checkin"
            placeholder="Check-In Date"
            type="date"
            value={formData.bookingdates.checkin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block font-semibold text-sm mb-2">
            Check-Out Date
          </label>
          <input
            className="appearance-none w-full p-2 rounded bg-[#323644] text-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-[#00ADB5] relative"
            name="checkout"
            placeholder="Check-Out Date"
            type="date"
            value={formData.bookingdates.checkout}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label className="block font-semibold text-sm mb-2">
          Any Additional Needs?
        </label>
        <input
          className="w-full p-2  rounded bg-[#323644] text-white focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-[#00ADB5]"
          name="additionalneeds"
          placeholder="Additional Needs (e.g., Breakfast)"
          value={formData.additionalneeds}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-[#00ADB5] font-bold text-xl flex items-center justify-center text-white px-4 py-3 !mt-8 rounded-3xl w-full hover:shadow-all-sides hover:shadow-[#00ADB5] transition ease-in-out delay-50"
      >
        {isLoading ? (
          <>
            {/* Loading Spinner SVG */}
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default Form;
