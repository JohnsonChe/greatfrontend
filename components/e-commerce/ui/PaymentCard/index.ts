import Amex from './Amex';
import MasterCard from './Mastercard'
import Visa from './Visa';
import Card from './Card'
import { CardNetworkName } from '../../../../utils/getCreditCardNetwork';


const NETWORKS: Record<CardNetworkName, React.FC<{ className?: string }>> = {
	'Amex': Amex,
	'Mastercard': MasterCard,
	'Visa': Visa,
	'Card': Card
}

export { Amex, MasterCard, Visa, Card, NETWORKS };