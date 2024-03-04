type Suit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades' | 'NT' | 'Pass';
type Rank = '1' | '2' | '3' | '4' | '5' | '6' | '7' | 'Pass';

interface Bid {
    rank: Rank;
    suit: Suit;
}

let currentBidValue = 0;
let consecutivePasses = 0;
let biddingEnded = false;

// Konverter input-streng fra bruker til Bid interface
function parseBid(bidStr: string): Bid | null {
    const suitMap: { [key: string]: Suit } = {
        'C': 'Clubs',
        'D': 'Diamonds',
        'H': 'Hearts',
        'S': 'Spades',
        'N': 'NT'
    };

    if (bidStr === "pass") {
        return { rank: 'Pass', suit: 'Pass' };
    }

    const rank = bidStr[0];
    const suitSymbol = bidStr[1];
    const suit = suitMap[suitSymbol];

    if (!suit || !rank) {
        return null;
    }

    return { rank: rank as Rank, suit: suit };
}

// Gi budet en verdi for å se om det er ansett som høyere enn nåværende bud
function bidValue(bid: Bid): number {
    if (bid.suit === 'Pass') {
        return -1; // Special value for pass
    }
    const suitValues: Record<Suit, number> = { 'Clubs': 1, 'Diamonds': 2, 'Hearts': 3, 'Spades': 4, 'NT': 5, 'Pass': 0 };
    const rankValue = bid.rank === 'Pass' ? 0 : parseInt(bid.rank) - 1;
    return rankValue * 5 + suitValues[bid.suit];
}

function isValidBid(newBid: Bid): boolean {
    if (biddingEnded) {
        console.log("Bidding has already ended.");
        return false;
    }
  
    if (newBid.suit === 'Pass') {
        consecutivePasses++;
        if (consecutivePasses >= 3) {
            biddingEnded = true;
            console.log("Bidding ended due to three consecutive passes.");
        }
        // A pass is always a valid "bid"
        return true; 
    } 
    else {
        // Reset passes count if a valid bid is made
        consecutivePasses = 0; 
    }
  
    const newBidValue = bidValue(newBid);
    if (newBidValue > currentBidValue) {
        // Update the current bid value if the new bid is higher
        currentBidValue = newBidValue; 
        return true;
    }
    return false;
  }