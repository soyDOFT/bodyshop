import styles from './VideoShowcase.module.css';

// components
import { Container } from 'src/components/ui/Container/Container';
import { VideoPlayer } from 'src/components/media/VideoPlayer/VideoPlayer';

// data
import { FEATURED_VIDEOS } from 'src/data/mediaSelections';

type VideoShowcaseProps = {
  heading?: string;
  intro?: string;
};

/** Show a few clips from the shop floor, played on demand. */
export function VideoShowcase({
  heading = 'See the work in motion',
  intro = 'Short clips from real jobs, including teardown, panel work, and booth time. Press play on any of them.',
}: VideoShowcaseProps) {
  return (
    <section className={styles.section} aria-labelledby="video-showcase-heading">
      <Container>
        <h2 id="video-showcase-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.intro}>{intro}</p>
        <ul className={styles.grid}>
          {FEATURED_VIDEOS.map((video) => (
            <li key={video.id}>
              <figure className={styles.item}>
                <div className={styles.frame}>
                  <VideoPlayer item={video} />
                </div>
                <figcaption className={styles.caption}>{video.alt}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
