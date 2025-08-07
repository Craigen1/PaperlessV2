import {
  HandIcon,
  InformationCircleIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  TicketIcon,
} from "@heroicons/react/outline";
import React, { useEffect } from "react";
import Steps from "./Steps";
import IconViews from "./IconViews";

export default function WhatsNew() {
  const steps = [
    {
      title:
        "Good Day SAP Users Please Join us this 22nd of this month as we discuss",
      Icon: SpeakerphoneIcon,
      msg: "",
      steps: [],
    },
    {
      title: "Goods Issue - Paperless",
      Icon: SparklesIcon,
      msg: "",
      steps: [],
    },
    {
      title: "What does this module do?",
      Icon: QuestionMarkCircleIcon,
      msg: "",
      steps: [
        {
          apex: "",
          stepTitle: "Allows you to Use Goods Issue of SAP WITHOUT using SAP",
          stepMsg: "",
        },
        {
          apex: "",
          stepTitle: "Less Time consuming",
          stepMsg:
            "-You will save a lot of time, as you don't need to Login on your RDS and SAP B1",
        },
      ],
    },

    {
      title: "Why do you need this module?",
      Icon: QuestionMarkCircleIcon,
      msg: "",
      steps: [
        {
          apex: "",
          stepTitle: "Efficiency",
          stepMsg:
            "-You will save a lot of time, as you don't need to Login on your RDS and SAP B1",
        },
        {
          apex: "",
          stepTitle: "Saves $",
          stepMsg: "-This module requires no SAP B1 License!",
        },
      ],
    },

    {
      title: "Why do you need this module?",
      Icon: QuestionMarkCircleIcon,
      msg: "",
      steps: [
        {
          apex: "",
          stepTitle: "Efficiency",
          stepMsg:
            "-You will save a lot of time, as you don't need to Login on your RDS and SAP B1",
        },
        {
          apex: "",
          stepTitle: "Saves $",
          stepMsg: "-This module requires no SAP B1 License!",
        },
      ],
    },
  ];

  // const doc = document.getElementsByClassName("topaz-c-fAXJsf");
  // for (let i = 0; i < doc.length; i++) {
  //   console.log(doc[i]);
  // }
  return (
    <>
      <div className="mt-2">
        {/* <div>
        <div className="frame max-w-md  mx-auto mt-10 p-2 flex">
          <SparklesIcon className="h-5 w-5 mr-2 mt-1 " />
          <p className="p-0 m-0 font-bold">Updates</p>
        </div>

        <div className="frame max-w-md  mx-auto mt-3 p-2 flex">
          <KeyIcon className="h-5 w-5 mr-2 mt-1 " />
          <p className="p-0 m-0 font-bold w-full">
            License Request Module V001
            <span className="float-right">08-08-23</span>
          </p>
        </div>

        <div className="frame max-w-md  mx-auto p-2 ">
          <div className="flex">
            <InformationCircleIcon className="h-5 w-5 mr-2 mt-1 " />
            <p className="p-0 m-0 font-bold">What does this do?</p>
          </div>
          <div className="ml-7">
            <p className="p-0 m-0 ">
              Simply submit your requirements, and paperless will allocate the
              licenses for your needs
            </p>
          </div>
        </div>

        <div className="frame max-w-md  mx-auto p-2 ">
          <div className="flex">
            <TicketIcon className="h-5 w-5 mr-2 mt-1 " />
            <p className="p-0 m-0 font-bold">How can I access this module?</p>
          </div>
          <div className="ml-7">
            <div className="p-0 m-0  flex">
              <div className="whitespace-nowrap mr-2">Step 1:</div>
              <div>
                Fill out this form{" "}
                <a href="https://forms.gle/S8H5tW8BcDcMjq2GA">
                  (https://forms.gle/S8H5tW8BcDcMjq2GA){" "}
                </a>
                to create a new Paperless account (if you don't have one)
              </div>
            </div>
          </div>

          <div className="ml-7">
            <div className="p-0 m-0  flex">
              <div className="whitespace-nowrap mr-2">Step 2:</div>
              <div>
                Go to :
                <a
                  href="https://10.10.10.211:3000/licenserequest"
                  className="mr-2"
                >
                  https://10.10.10.211:3000/licenserequest
                </a>
                (this will be the site where you request license for SAP
                Business one )
              </div>
            </div>
          </div>
        </div>

        <div className="frame max-w-md  mx-auto p-2 ">
          <div className="flex">
            <QuestionMarkCircleIcon className="h-5 w-5 mr-2 mt-1 " />
            <p className="p-0 m-0 font-bold">Why the Module?</p>
          </div>
          <div className="ml-7">
            <div className="p-0 m-0  flex">
              <div className="whitespace-nowrap mr-2">A.</div>
              <div>
                To give SAP Business one Users a freedom and control on his/her
                license
              </div>
            </div>
          </div>

          <div className="ml-7">
            <div className="p-0 m-0  flex">
              <div className="whitespace-nowrap mr-2">B.</div>
              <div>To give Developers more time on other projects</div>
            </div>
          </div>
        </div>

        <div className="frame max-w-md  mx-auto p-2 ">
          <div className="flex">
            <HandIcon className="h-5 w-5 mr-2 mt-1 " />
            <p className="p-0 m-0 font-bold">Got questions?</p>
          </div>

          <div className="ml-7">
            <div className="p-0 m-0  flex">
              <div className="whitespace-nowrap"></div>
              <div>
                If you have any questions or concerns, please do not hesitate to
                contact our support team at support@innovativepkg.com.ph
              </div>
            </div>
          </div>
        </div>
      </div> */}
      </div>
      <div className="p-2">
        {steps.map((item, index) => (
          <>
            <Steps steps={item} />
          </>
        ))}

        <iframe
          src="https://app.tango.us/app/embed/aefd64b8-8f99-44d4-b9d4-9e31616b291d?skipCover=false&defaultListView=false&skipBranding=true"
          sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
          security="restricted"
          title="Efficient Workflow for Goods Issue Request - Admin and Support"
          width="100%"
          height="520px"
          referrerpolicy="strict-origin-when-cross-origin"
          frameborder="0"
          webkitallowfullscreen="webkitallowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          allowfullscreen="allowfullscreen"
          className="max-w-3xl mx-auto"
        ></iframe>
      </div>
      {/* <IconViews /> */}
    </>
  );
}
