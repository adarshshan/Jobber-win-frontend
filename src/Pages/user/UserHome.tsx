import React, { ReactNode } from 'react';
import { FaHeart } from "react-icons/fa";
import PostMessage from '../../Components/User/PostPage/PostMessage';


interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className="wrapper pt-10 px-8 flex flex-col items-center">
    {children}
  </div>
);

const Card: React.FC<WrapperProps> = ({ children }) => (
  <article className="mb-4 break-inside p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border sm:w-3/6 w-full">
    {children}
  </article>
);

const Comment: React.FC<{ imageUrl: string; name: string; time: string; content: string; }> = ({ imageUrl, name, time, content }) => (
  <div className="media flex pb-4">
    <a className="mr-4" href="#">
      <img className="rounded-full max-w-none w-12 h-12" src={imageUrl} alt={name} />
    </a>
    <div className="media-body">
      <div>
        <a className="inline-block text-base font-bold mr-2" href="#">{name}</a>
        <span className="text-slate-500 dark:text-slate-300">{time}</span>
      </div>
      <p>{content}</p>
      <div className="mt-2 flex items-center">
        <a className="inline-flex items-center py-2 mr-3" href="#">
          <span className="mr-2">
            <svg className="fill-rose-600 dark:fill-rose-400" style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          </span>
          <span className="text-base font-bold">12</span>
        </a>
        <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
          Reply
        </button>
      </div>
    </div>
  </div>
);

const MoreCommentsButton: React.FC<{}> = () => (
  <div className="w-full">
    <a href="#" className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">
      Show more comments
    </a>
  </div>
);

const Footer: React.FC<{}> = () => (
  <footer className="w-full flex justify-center flex-col py-4 text-center mt-14">
    <p className="mb-1">
      Built by{' '}
      <a className="font-medium underline" href="https://codepen.io/frankuxui">
        Frank Esteban
      </a>
    </p>
    <p className="dark:text-white mb-3">
      Contact me on the different platforms and social networks
    </p>
    <div className="flex items-center justify-center">
      <a className="w-12 h-12 flex justify-center items-center rounded-full hover:bg-slate-300 transition dark:hover:bg-slate-800 dark:text-white" href="https://codepen.io/frankuxui" target="__blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.21 12L6.88 12.89V11.11L8.21 12M11.47 9.82V7.34L7.31 10.12L9.16 11.36L11.47 9.82M16.7 10.12L12.53 7.34V9.82L14.84 11.36L16.7 10.12M7.31 13.88L11.47 16.66V14.18L9.16 12.64L7.31 13.88M12.53 14.18V16.66L16.7 13.88L14.84 12.64L12.53 14.18M12 10.74L10.12 12L12 13.26L13.88 12L12 10.74M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12M18.18 10.12C18.18 10.09 18.18 10.07 18.18 10.05L18.17 10L18.17 10L18.16 9.95C18.15 9.94 18.15 9.93 18.14 9.91L18.13 9.89L18.11 9.85L18.1 9.83L18.08 9.8L18.06 9.77L18.03 9.74L18 9.72L18 9.7L17.96 9.68L17.95 9.67L12.3 5.91C12.12 5.79 11.89 5.79 11.71 5.91L6.05 9.67L6.05 9.68L6 9.7C6 9.71 6 9.72 6 9.72L5.97 9.74L5.94 9.77L5.93 9.8L5.9 9.83L5.89 9.85L5.87 9.89L5.86 9.91L5.84 9.95L5.84 10L5.83 10L5.82 10.05C5.82 10.07 5.82 10.09 5.82 10.12V13.88C5.82 13.91 5.82 13.93 5.82 13.95L5.83 14L5.84 14.05L5.84 14.05C5.84 14.07 5.84 14.09 5.84 14.12L5.85 14.15L5.86 14.19L5.87 14.21L5.89 14.25L5.9 14.28L5.93 14.31L5.94 14.33L5.97 14.36L6 14.38L6.05 14.4L6.05 14.4L6.05 14.4L11.71 18.16L11.71 18.16C11.89 18.28 12.12 18.28 12.3 18.16L17.95 14.4L17.95 14.4L17.95 14.4L18 14.38L18 14.36L18.03 14.33L18.06 14.31L18.08 14.28L18.11 14.25L18.13 14.21L18.16 14.19L18.17 14.15L18.17 14.12C18.17 14.09 18.17 14.07 18.17 14.05L18.18 14L18.18 13.95L18.18 13.95C18.18 13.93 18.18 13.91 18.18 13.88V10.12Z" />
        </svg>
      </a>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Wrapper>
      <Card>
        <article className="mb-4 break-inside p-2 rounded-xl bg-gray-200 dark:bg-slate-800 flex flex-col bg-clip-border  w-full">
          <div className="flex pb-6 items-center justify-between">
            <div className="flex">
              <a className="inline-block mr-4" href="#">
                <img className="rounded-full max-w-none w-12 h-12" src="https://randomuser.me/api/portraits/men/35.jpg" />
              </a>
              <div className="flex flex-col">
                <div>
                  <a className="inline-block text-lg font-bold dark:text-white" href="#">Wade Warren</a>
                </div>
                <div className="text-slate-500 dark:text-slate-300">
                  July 17, 2018
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold dark:text-white">
            Web Design templates Selection
          </h2>
          <div className="py-4">
            <div>
              <img src="https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" className='w-full' alt="" />
            </div>
          </div>
          <p className="dark:text-slate-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="py-4">
            <a className="inline-flex items-center" href="#">
              <span className="mr-2 text-red-700"> <FaHeart /></span>
              <span className="text-lg font-bold">34</span>
            </a>
          </div>

          <PostMessage />

        </article>
        <h2 className="mb-4 text-2xl font-bold">Comments</h2>
        <Comment
          imageUrl="https://randomuser.me/api/portraits/women/90.jpg"
          name="Jane Doe"
          time="2 hours ago"
          content="Great job on this project! I love the design and the attention to detail."
        />
        <Comment
          imageUrl="https://randomuser.me/api/portraits/men/45.jpg"
          name="John Smith"
          time="1 hour ago"
          content="Thanks, Jane! I really appreciate your feedback. Let me know if you have any suggestions for improvement."
        />
        <Comment
          imageUrl="https://randomuser.me/api/portraits/men/45.jpg"
          name="John Smith"
          time="1 hour ago"
          content="Thanks, Jane! I really appreciate your feedback. Let me know if you have any suggestions for improvement."
        />
        <MoreCommentsButton />
      </Card>
      <Footer />
    </Wrapper>
  );
};

export default App;
