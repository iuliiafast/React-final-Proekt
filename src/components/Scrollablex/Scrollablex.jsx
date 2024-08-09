import { useRef } from "react";
import styles from './Scrollablex.module.css';
import { Button } from "antd";

export default function ScrollableBox({ product = { description: "Описание недоступно" } }) {
  const boxRef = useRef(null);

  const scrollDown = () => {
    const box = boxRef.current;
    const paragraph = box.querySelector('p');
    const paragraphHeight = paragraph.offsetHeight;
    const currentScroll = box.scrollTop;
    const maxScroll = box.scrollHeight - box.clientHeight;

    if (currentScroll + paragraphHeight >= maxScroll) {
      box.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      box.scrollBy({
        top: paragraphHeight,
        behavior: 'smooth'
      });
    }
  };

  const description = product.description;

  return (
    <div className={styles.box} ref={boxRef}>
      <div className={styles.content}>
        <p>
          {description}
        </p>
      </div>
      <div className={styles.readmore}>
        <Button onClick={scrollDown} className={styles.readMore}>
          <span>Read more</span>
        </Button>
      </div>
    </div>
  );
}
