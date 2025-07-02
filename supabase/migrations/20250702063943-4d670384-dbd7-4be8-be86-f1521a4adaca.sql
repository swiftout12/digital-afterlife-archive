
-- First, let's check what's currently in the graves table
SELECT COUNT(*) as total_graves FROM graves;

-- Check what categories exist
SELECT category, COUNT(*) as count FROM graves GROUP BY category;

-- Let's insert 50 fake burial posts with diverse content
INSERT INTO graves (user_id, title, epitaph, backstory, category, tier, featured, shares, views, likes, created_at) VALUES
-- Funny category (15 posts)
((SELECT id FROM profiles LIMIT 1), 'My Diet Plans', 'Lasted exactly 3 hours before pizza called', 'Started strong with kale smoothies, ended with midnight snacks', 'Funny', 'basic', false, 23, 156, 45, NOW() - INTERVAL '2 hours'),
((SELECT id FROM profiles LIMIT 1), 'My New Year Resolutions', 'Made it to January 3rd this time', 'Personal best! Usually give up on January 2nd', 'Funny', 'basic', false, 67, 234, 78, NOW() - INTERVAL '4 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Attempt at Cooking', 'Even the smoke detector gave up', 'The fire department knows me by name now', 'Funny', 'basic', false, 89, 445, 123, NOW() - INTERVAL '6 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Social Life', 'Netflix was a better friend anyway', 'Last seen: before the pandemic started', 'Funny', 'basic', false, 156, 678, 234, NOW() - INTERVAL '8 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Bank Account', 'Death by a thousand micro-transactions', 'Those $2.99 apps really add up', 'Funny', 'basic', false, 45, 298, 67, NOW() - INTERVAL '10 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Attention Span', 'What were we talking about again?', 'Lasted shorter than a TikTok video', 'Funny', 'basic', false, 234, 567, 189, NOW() - INTERVAL '12 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Sleep Schedule', 'Became nocturnal without consent', '3 AM became my new bedtime somehow', 'Funny', 'basic', false, 78, 345, 98, NOW() - INTERVAL '14 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Houseplant', 'Survived longer than my relationships', 'RIP Philbert, you were too good for this world', 'Funny', 'basic', false, 123, 432, 156, NOW() - INTERVAL '16 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Gym Membership', 'Most expensive coat hanger ever', 'Paid for 12 months, used for 12 days', 'Funny', 'basic', false, 98, 234, 45, NOW() - INTERVAL '18 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Weekend Plans', 'Ambition killed by Netflix', 'Was going to be productive, watched 3 seasons instead', 'Funny', 'basic', false, 167, 789, 234, NOW() - INTERVAL '20 hours'),
((SELECT id FROM profiles LIMIT 1), 'My WiFi Password', 'Too complex for guests, too simple for hackers', 'Password123! was apparently not secure enough', 'Funny', 'basic', false, 89, 456, 123, NOW() - INTERVAL '22 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Motivation', 'Left the chat at 2 PM Monday', 'Last seen: Sunday night planning the week', 'Funny', 'basic', false, 145, 623, 178, NOW() - INTERVAL '1 day'),
((SELECT id FROM profiles LIMIT 1), 'My Patience', 'Died waiting for the page to load', 'Killed by a 5-second loading screen', 'Funny', 'basic', false, 76, 298, 89, NOW() - INTERVAL '1 day 2 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Dignity', 'Sacrificed for free food', 'That company pizza party was worth it', 'Funny', 'basic', false, 234, 567, 145, NOW() - INTERVAL '1 day 4 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Fashion Sense', 'Died with the last trend I understood', 'Apparently skinny jeans are out now?', 'Funny', 'basic', false, 123, 445, 167, NOW() - INTERVAL '1 day 6 hours'),

-- Tech category (10 posts)
((SELECT id FROM profiles LIMIT 1), 'Internet Explorer', 'Finally put out of its misery', 'Served us well in the dial-up era', 'Tech', 'basic', false, 456, 1234, 567, NOW() - INTERVAL '2 days'),
((SELECT id FROM profiles LIMIT 1), 'My Code From 2019', 'No comments, no documentation, no mercy', 'Even I dont understand what I was thinking', 'Tech', 'basic', false, 234, 789, 345, NOW() - INTERVAL '2 days 2 hours'),
((SELECT id FROM profiles LIMIT 1), 'Adobe Flash Player', 'Took half the internet with it', 'End of an era of browser crashes', 'Tech', 'basic', true, 789, 2345, 890, NOW() - INTERVAL '2 days 4 hours'),
((SELECT id FROM profiles LIMIT 1), 'My iPhone Battery', 'Lasted 6 hours on a good day', 'Died faster than my enthusiasm for iOS updates', 'Tech', 'basic', false, 167, 523, 234, NOW() - INTERVAL '2 days 6 hours'),
((SELECT id FROM profiles LIMIT 1), 'Windows Vista', 'A dark chapter in computing history', 'Made us appreciate Windows XP even more', 'Tech', 'basic', false, 345, 876, 456, NOW() - INTERVAL '2 days 8 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Gaming PC', 'Couldn\'t run Crysis, can\'t run anything now', 'Graphics card died trying to render grass', 'Tech', 'basic', false, 189, 634, 278, NOW() - INTERVAL '2 days 10 hours'),
((SELECT id FROM profiles LIMIT 1), 'Twitter Blue Checkmarks', 'Democratized into meaninglessness', 'From status symbol to $8 monthly fee', 'Tech', 'basic', false, 567, 1456, 678, NOW() - INTERVAL '2 days 12 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Wi-Fi Router', 'Needed daily CPR to stay alive', 'Turned off and on again one too many times', 'Tech', 'basic', false, 123, 456, 189, NOW() - INTERVAL '2 days 14 hours'),
((SELECT id FROM profiles LIMIT 1), 'Clippy', 'It looks like you\'re writing an obituary', 'The most annoying assistant ever created', 'Tech', 'basic', false, 678, 1789, 456, NOW() - INTERVAL '2 days 16 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Hard Drive', '20 years of memes, gone forever', 'Should have backed up those reaction GIFs', 'Tech', 'basic', false, 234, 678, 345, NOW() - INTERVAL '2 days 18 hours'),

-- Crypto category (8 posts)
((SELECT id FROM profiles LIMIT 1), 'My Crypto Portfolio', 'HODL\'d straight to zero', 'Diamond hands, empty pockets', 'Crypto', 'basic', false, 345, 1234, 567, NOW() - INTERVAL '3 days'),
((SELECT id FROM profiles LIMIT 1), 'Dogecoin Dreams', 'To the moon became to the tomb', 'Such loss, very sad, much regret', 'Crypto', 'basic', false, 456, 876, 234, NOW() - INTERVAL '3 days 3 hours'),
((SELECT id FROM profiles LIMIT 1), 'NFT Collection', 'Right-clicked into oblivion', 'Turns out JPEGs aren\'t forever', 'Crypto', 'basic', false, 789, 2134, 678, NOW() - INTERVAL '3 days 6 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Seed Phrase', 'Lost it, lost everything', 'Written on paper, eaten by dog', 'Crypto', 'basic', false, 234, 567, 189, NOW() - INTERVAL '3 days 9 hours'),
((SELECT id FROM profiles LIMIT 1), 'Bitcoin at $69K', 'Bought high, sold never', 'Still waiting for it to come back', 'Crypto', 'basic', false, 567, 1345, 456, NOW() - INTERVAL '3 days 12 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Mining Rig', 'Heated the house, emptied the wallet', 'More expensive than actual heating', 'Crypto', 'basic', false, 123, 445, 234, NOW() - INTERVAL '3 days 15 hours'),
((SELECT id FROM profiles LIMIT 1), 'Shiba Inu Coins', 'Much doge, no moon', 'The sequel nobody asked for', 'Crypto', 'basic', false, 345, 789, 123, NOW() - INTERVAL '3 days 18 hours'),
((SELECT id FROM profiles LIMIT 1), 'My DeFi Yields', 'Decentralized straight into the void', 'APY too good to be true, was too good to be true', 'Crypto', 'basic', false, 678, 1567, 345, NOW() - INTERVAL '3 days 21 hours'),

-- Exes category (5 posts)
((SELECT id FROM profiles LIMIT 1), 'My Ex-Boyfriend', 'Left me for someone with better WiFi', 'At least I still have his Netflix password', 'Exes', 'basic', false, 234, 678, 345, NOW() - INTERVAL '4 days'),
((SELECT id FROM profiles LIMIT 1), 'My Ex-Girlfriend', 'Took the dog, left the emotional baggage', 'Miss the dog more than I miss her', 'Exes', 'basic', false, 456, 1023, 234, NOW() - INTERVAL '4 days 6 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Ex-Best Friend', 'Killed by a group chat gone wrong', 'Blue ticks but no replies for 3 months', 'Exes', 'basic', false, 123, 456, 189, NOW() - INTERVAL '4 days 12 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Ex-Boss', 'Micromanaged me into another dimension', 'Last words: "Can you stay late tonight?"', 'Exes', 'basic', false, 345, 789, 267, NOW() - INTERVAL '4 days 18 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Ex-Roommate', 'Left dishes in the sink for eternity', 'Took my favorite mug when they moved out', 'Exes', 'basic', false, 189, 534, 123, NOW() - INTERVAL '5 days'),

-- Cringe category (6 posts)
((SELECT id FROM profiles LIMIT 1), 'My TikTok Dance Phase', 'Renegade-d my way to embarrassment', 'The internet never forgets, unfortunately', 'Cringe', 'basic', false, 567, 1234, 345, NOW() - INTERVAL '5 days 6 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Emo Phase', 'It wasn\'t just a phase, mom', 'Black eyeliner and existential dread', 'Cringe', 'basic', false, 234, 678, 189, NOW() - INTERVAL '5 days 12 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Poetry From High School', 'Deep thoughts, shallow execution', 'Thought I was the next Shakespeare', 'Cringe', 'basic', false, 345, 876, 234, NOW() - INTERVAL '5 days 18 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Facebook Statuses From 2009', 'Oversharing before it was cool', 'Every meal documented, every feeling shared', 'Cringe', 'basic', false, 456, 1123, 567, NOW() - INTERVAL '6 days'),
((SELECT id FROM profiles LIMIT 1), 'My Myspace Profile', 'Top 8 friends caused real drama', 'HTML skills peaked at glittery backgrounds', 'Cringe', 'basic', false, 678, 1456, 234, NOW() - INTERVAL '6 days 6 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Selfie Stick Phase', 'Extended my reach, shortened my dignity', 'Peak millennial behavior captured forever', 'Cringe', 'basic', false, 189, 567, 123, NOW() - INTERVAL '6 days 12 hours'),

-- Trends category (3 posts)
((SELECT id FROM profiles LIMIT 1), 'Fidget Spinners', 'Spun out of relevance', 'From classroom disruption to forgotten toy', 'Trends', 'basic', false, 345, 789, 234, NOW() - INTERVAL '7 days'),
((SELECT id FROM profiles LIMIT 1), 'Planking', 'Fell flat on its face', 'Literally the most basic trend ever', 'Trends', 'basic', false, 234, 567, 145, NOW() - INTERVAL '7 days 12 hours'),
((SELECT id FROM profiles LIMIT 1), 'Ice Bucket Challenge', 'Got cold, then got old', 'At least it was for a good cause', 'Trends', 'basic', false, 456, 1034, 678, NOW() - INTERVAL '8 days'),

-- Politics category (2 posts)
((SELECT id FROM profiles LIMIT 1), 'Civil Political Discourse', 'Murdered by social media', 'Killed by caps lock and bad faith arguments', 'Politics', 'basic', false, 678, 1567, 345, NOW() - INTERVAL '8 days 12 hours'),
((SELECT id FROM profiles LIMIT 1), 'My Faith in Politicians', 'Died of natural causes at age 12', 'Lasted longer than most peoples', 'Politics', 'basic', false, 345, 876, 234, NOW() - INTERVAL '9 days'),

-- Serious category (1 post)
((SELECT id FROM profiles LIMIT 1), 'My Childhood Dreams', 'Grew up and got realistic', 'Astronaut to accountant: the journey', 'Serious', 'basic', false, 789, 2345, 567, NOW() - INTERVAL '10 days'));

-- Verify the data was inserted
SELECT 'Total graves:' as info, COUNT(*) as count FROM graves
UNION ALL
SELECT 'By category:', category::text FROM graves GROUP BY category ORDER BY category;
