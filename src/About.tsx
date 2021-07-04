import Preact from 'preact';
import styles from './index.css';

export default function About(): Preact.JSX.Element {
  return (
    <section id={styles.applet}>
      <h1>The Xbox tragedy calculator</h1>
      <p className={styles.italicA}>This site is a companion to the <a href="https://twitter.com/wtyppod">Well There's
        Your Problem</a> podcast produced by @donoteat02, @AliceAvizandum, and @oldmanders0n. The podcast explores
        engineering disasters their causes. Its a running joke to measure the compensation for victims and their
        families as the equivalent number of Xboxs. Thus the calculator was born.</p>
      <p className={styles.italicA}>This site was made over the long fourth of July weekend of 2021
        by <a href="https://brian-duffy.dev">Brian Duffy</a>. This project can also be found
        on <a href="https://github.com/19dufbri/HowTragic.net">GitHub</a>.</p>
      <p className={styles.taCenter}><a href="/">Go back to the calculator</a></p>
    </section>
  );
}
