import type { ClientConfig } from '../types';
import { ActionLink } from '../components/ActionLink';
import { Photo } from '../components/Photo';

export const Story = ({ story }: { story: NonNullable<ClientConfig['story']> }) => (
  <section className="story" id="story" aria-labelledby="story-title">
    <div className="story-inner container">
      <div className="story-copy">
        <p className="eyebrow">{story.eyebrow}</p>
        <h2 id="story-title">{story.title}</h2>
        <p>{story.body}</p>
        {story.details && (
          <dl className="story-details">
            {story.details.map((detail) => (
              <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>
            ))}
          </dl>
        )}
        {story.action && <ActionLink action={story.action} secondary />}
      </div>
      <figure><Photo image={story.image} /></figure>
    </div>
  </section>
);
