import { Component, JSX } from 'preact';
import styles from './index.css';
import _conversion from './conv.json';
import _currencies from './allowed_currencies.json';

interface CurrValue {
    currencyName: string;
    currencySymbol?: string;
    id: string;
    priority?: boolean;
}
const currencies: Array<{k: string, v: CurrValue}> = [];
const conversion = _conversion as {[key: string]: number};

// Shuffling to massage the JSON in a happy format
{
  const unsortedCurrencies = _currencies as {[key: string]: CurrValue};

  for (const k in unsortedCurrencies) {
    const v = unsortedCurrencies[k];
    currencies.push({ k, v });
  }

  currencies.sort((a, b) => a.v.currencyName.localeCompare(b.v.currencyName));
}

interface DataEntryProps {
    setAward: (award: number, currency: CurrValue) => void;
}

interface DataEntryState {
    currency: string;
    victims: number;
    award: number;
}

class DataEntry extends Component<DataEntryProps, DataEntryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currency: 'USD',
      victims: 0,
      award: 0,
    };
  }

  render() {
    const currList: JSX.Element[] = [];
    const priorityCurrList: JSX.Element[] = [];
    for (const k in currencies) {
      const v = currencies[k].v;
      const elem = <option value={v.id} key={k}>{v.currencyName}{v.currencySymbol && ` - (${v.currencySymbol})`}</option>;
      if (v.priority) {
        priorityCurrList.push(elem);
      }
      else {
        currList.push(elem);
      }
    }

    const current = currencies.find((item) => {
      return item.k === this.state.currency;
    });

    return (
      <form onSubmit={e => {e.preventDefault(); this.props.setAward(this.state.award/this.state.victims, current.v)}}>
        <label htmlFor="currency">Currency:</label>
        <select value={this.state.currency} onInput={(e) => this.setState({ currency: e.currentTarget.value })} name="currency">
          <option disabled>--- Common currencies ---</option>
          {priorityCurrList}
          <option disabled>--- Converted currencies ---</option>
          {currList}
        </select>

        <br />
        <br />

        <label htmlFor="award">Amount Awarded:</label>
        <br />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <span style={{ margin: 'auto 1rem' }}>{current.v.currencySymbol ?? current.v.id}:</span>
          <input onInput={(e) => this.setState({ award: parseFloat(e.currentTarget.value) })} type="number"
            id="award" min="0" />
        </div>

        <br />

        <label htmlFor="victims">Number of Victims:</label>
        <br />
        <input onInput={(e) => this.setState({ victims: parseFloat(e.currentTarget.value) })} type="number"
          name="victims" placeholder="Number of Victims" min="0" />

        <br />
        <br />

        <input value="Calculate" type="submit" />
      </form>
    );
  }
}

interface XBoxDisplayProps {
    award: number;
    currency: CurrValue;
    reset: () => void;
}

function XBoxDisplay(props: XBoxDisplayProps) {
  const ratio = conversion[props.currency.id];
  const nXbox = ratio * props.award / 500;

  return (
    <section className={styles.taCenter}>
      <h3>Congratulations Winner!</h3>
      <p>We're happy to announce that we ran the numbers and it looks like you're in for a nice surprise. We found in
        our budget to give you <b><i>{nXbox.toFixed(2)}</i></b> Xboxs! We hope you have just as much fun with your new
        console(s) as you had in the disaster that got you here!</p>
      <button onClick={props.reset}>Try Again</button>
    </section>
  );
}

function Header(): JSX.Element {
  return (
    <section>
      <h1 className={styles.taCenter}>HowTragic.net</h1>
      <p>Had a train derail? Suffered from a tragic and entirely preventable accident? Well then its your lucky day; as
        a one time offer you can receive Xboxs courtesy of those who hurt you. Simply enter the details below and be
        amazed what you've earned!</p>
    </section>
  );
}

interface AppletState {
    award?: number;
    currency?: CurrValue;
    ready?: boolean;
}

export default class Applet extends Component<{}, AppletState> {
  constructor(props: {}) {
    super(props);
    this.state = {};

    this.setAward = this.setAward.bind(this);
    this.reset = this.reset.bind(this);
  }

  setAward(award: number, currency: CurrValue) {
    if (award > 0) {
      this.setState({ award, currency, ready: true });
    }
  }

  reset() {
    this.setState({ ready: false });
  }

  render() {
    return (
      <section id={styles.applet}>
        <Header />
        {!this.state.ready && <DataEntry setAward={this.setAward} />}
        {this.state.ready && <XBoxDisplay reset={this.reset} award={this.state.award} currency={this.state.currency} />}
        <p className={styles.taCenter}><a href="/about">What is this?</a></p>
      </section>
    );
  }
}
