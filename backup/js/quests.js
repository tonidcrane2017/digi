// ===========================
// Quest Database
// ===========================

const allQuests = [
    // Brain Anatomy Quests
    {
        id: 'anatomy-01',
        type: 'trivia',
        category: 'Brain Anatomy',
        difficulty: 'easy',
        question: 'Which part of the brain is responsible for processing visual information?',
        options: [
            'Occipital Lobe',
            'Frontal Lobe',
            'Temporal Lobe',
            'Parietal Lobe'
        ],
        correct: 0,
        explanation: 'The occipital lobe, located at the back of the brain, is primarily responsible for processing visual information from the eyes.',
        points: 10
    },
    {
        id: 'anatomy-02',
        type: 'trivia',
        category: 'Brain Anatomy',
        difficulty: 'medium',
        question: 'What is the name of the structure that connects the two hemispheres of the brain?',
        options: [
            'Cerebellum',
            'Corpus Callosum',
            'Medulla Oblongata',
            'Hippocampus'
        ],
        correct: 1,
        explanation: 'The corpus callosum is a thick band of nerve fibers that connects the left and right hemispheres, allowing them to communicate.',
        points: 15
    },
    {
        id: 'anatomy-03',
        type: 'trivia',
        category: 'Brain Anatomy',
        difficulty: 'easy',
        question: 'Which lobe of the brain is associated with decision-making and personality?',
        options: [
            'Frontal Lobe',
            'Temporal Lobe',
            'Occipital Lobe',
            'Parietal Lobe'
        ],
        correct: 0,
        explanation: 'The frontal lobe is crucial for executive functions including decision-making, planning, and personality expression.',
        points: 10
    },

    // Neurotransmitters
    {
        id: 'neuro-01',
        type: 'trivia',
        category: 'Neurotransmitters',
        difficulty: 'medium',
        question: 'Which neurotransmitter is often called the "feel-good" chemical?',
        options: [
            'GABA',
            'Acetylcholine',
            'Dopamine',
            'Glutamate'
        ],
        correct: 2,
        explanation: 'Dopamine is associated with pleasure, reward, and motivation, earning it the nickname "feel-good" neurotransmitter.',
        points: 15
    },
    {
        id: 'neuro-02',
        type: 'trivia',
        category: 'Neurotransmitters',
        difficulty: 'hard',
        question: 'Which neurotransmitter is the primary inhibitory neurotransmitter in the brain?',
        options: [
            'Dopamine',
            'Serotonin',
            'GABA',
            'Norepinephrine'
        ],
        correct: 2,
        explanation: 'GABA (gamma-aminobutyric acid) is the main inhibitory neurotransmitter, reducing neuronal excitability throughout the nervous system.',
        points: 20
    },
    {
        id: 'neuro-03',
        type: 'trivia',
        category: 'Neurotransmitters',
        difficulty: 'medium',
        question: 'Low levels of which neurotransmitter are associated with depression?',
        options: [
            'Serotonin',
            'Dopamine',
            'Acetylcholine',
            'Both A and B'
        ],
        correct: 3,
        explanation: 'Both serotonin and dopamine deficiencies are linked to depression, which is why many antidepressants target these systems.',
        points: 15
    },

    // Memory and Learning
    {
        id: 'memory-01',
        type: 'trivia',
        category: 'Memory & Learning',
        difficulty: 'easy',
        question: 'Which brain structure is crucial for forming new memories?',
        options: [
            'Hippocampus',
            'Amygdala',
            'Thalamus',
            'Hypothalamus'
        ],
        correct: 0,
        explanation: 'The hippocampus plays a vital role in forming new memories and spatial navigation. Damage to it can result in inability to form new memories.',
        points: 10
    },
    {
        id: 'memory-02',
        type: 'trivia',
        category: 'Memory & Learning',
        difficulty: 'medium',
        question: 'What type of memory allows you to remember how to ride a bike?',
        options: [
            'Episodic Memory',
            'Semantic Memory',
            'Procedural Memory',
            'Working Memory'
        ],
        correct: 2,
        explanation: 'Procedural memory stores information about how to perform skills and tasks. It\'s often unconscious and includes motor skills like riding a bike.',
        points: 15
    },
    {
        id: 'memory-03',
        type: 'trivia',
        category: 'Memory & Learning',
        difficulty: 'hard',
        question: 'What is the typical capacity of working memory according to Miller\'s Law?',
        options: [
            '5 ± 2 items',
            '7 ± 2 items',
            '9 ± 2 items',
            '11 ± 2 items'
        ],
        correct: 1,
        explanation: 'George Miller\'s famous "7 ± 2" rule suggests that the average person can hold about 7 (plus or minus 2) items in working memory.',
        points: 20
    },

    // Brain Function
    {
        id: 'function-01',
        type: 'trivia',
        category: 'Brain Function',
        difficulty: 'easy',
        question: 'What percentage of the body\'s oxygen does the brain use?',
        options: [
            '10%',
            '20%',
            '30%',
            '40%'
        ],
        correct: 1,
        explanation: 'Despite being only about 2% of body weight, the brain uses approximately 20% of the body\'s oxygen and energy.',
        points: 10
    },
    {
        id: 'function-02',
        type: 'trivia',
        category: 'Brain Function',
        difficulty: 'medium',
        question: 'Which brain wave pattern is associated with deep, dreamless sleep?',
        options: [
            'Alpha waves',
            'Beta waves',
            'Delta waves',
            'Gamma waves'
        ],
        correct: 2,
        explanation: 'Delta waves are the slowest brain waves and are associated with deep, dreamless sleep and healing.',
        points: 15
    },
    {
        id: 'function-03',
        type: 'trivia',
        category: 'Brain Function',
        difficulty: 'hard',
        question: 'What is neuroplasticity?',
        options: [
            'The brain\'s ability to form new neural connections',
            'The protective covering of neurons',
            'A type of brain surgery',
            'The process of neuron death'
        ],
        correct: 0,
        explanation: 'Neuroplasticity is the brain\'s remarkable ability to reorganize itself by forming new neural connections throughout life.',
        points: 20
    },

    // Famous Neuroscience
    {
        id: 'history-01',
        type: 'trivia',
        category: 'Neuroscience History',
        difficulty: 'medium',
        question: 'Who is known as the "father of modern neuroscience"?',
        options: [
            'Sigmund Freud',
            'Santiago Ramón y Cajal',
            'Ivan Pavlov',
            'Carl Jung'
        ],
        correct: 1,
        explanation: 'Santiago Ramón y Cajal, a Spanish neuroscientist, is considered the father of modern neuroscience for his work on brain structure.',
        points: 15
    },
    {
        id: 'history-02',
        type: 'trivia',
        category: 'Neuroscience History',
        difficulty: 'easy',
        question: 'What did Ivan Pavlov famously study?',
        options: [
            'Classical Conditioning',
            'Brain Surgery',
            'Memory Formation',
            'Vision Processing'
        ],
        correct: 0,
        explanation: 'Ivan Pavlov is famous for his work on classical conditioning, demonstrated through his experiments with dogs and salivation.',
        points: 10
    },
    {
        id: 'history-03',
        type: 'trivia',
        category: 'Neuroscience History',
        difficulty: 'hard',
        question: 'The case of Phineas Gage helped scientists understand which aspect of the brain?',
        options: [
            'Memory formation',
            'Vision processing',
            'Personality and frontal lobe function',
            'Language comprehension'
        ],
        correct: 2,
        explanation: 'Phineas Gage survived a tamping iron through his frontal lobe, and the resulting personality changes helped establish the role of frontal lobes in personality.',
        points: 20
    },

    // Neurons and Synapses
    {
        id: 'neuron-01',
        type: 'trivia',
        category: 'Neurons',
        difficulty: 'easy',
        question: 'What is the gap between two neurons called?',
        options: [
            'Synapse',
            'Axon',
            'Dendrite',
            'Soma'
        ],
        correct: 0,
        explanation: 'The synapse is the junction between two neurons where neurotransmitters are released to transmit signals.',
        points: 10
    },
    {
        id: 'neuron-02',
        type: 'trivia',
        category: 'Neurons',
        difficulty: 'medium',
        question: 'What is the fatty substance that insulates axons and speeds up signal transmission?',
        options: [
            'Cholesterol',
            'Myelin',
            'Collagen',
            'Keratin'
        ],
        correct: 1,
        explanation: 'Myelin is a fatty white substance that wraps around axons, insulating them and allowing electrical impulses to travel faster.',
        points: 15
    },
    {
        id: 'neuron-03',
        type: 'trivia',
        category: 'Neurons',
        difficulty: 'hard',
        question: 'Approximately how many neurons are in the human brain?',
        options: [
            '86 million',
            '860 million',
            '86 billion',
            '860 billion'
        ],
        correct: 2,
        explanation: 'The human brain contains approximately 86 billion neurons, each forming thousands of connections with other neurons.',
        points: 20
    },

    // Cognitive Psychology
    {
        id: 'cognitive-01',
        type: 'trivia',
        category: 'Cognitive Psychology',
        difficulty: 'easy',
        question: 'What is the Stroop Effect?',
        options: [
            'Difficulty naming the color of words when the word and color don\'t match',
            'Remembering the first and last items in a list',
            'Forming false memories',
            'Seeing patterns in random data'
        ],
        correct: 0,
        explanation: 'The Stroop Effect demonstrates how reading is so automatic that it interferes with naming the color of text when they conflict.',
        points: 10
    },
    {
        id: 'cognitive-02',
        type: 'trivia',
        category: 'Cognitive Psychology',
        difficulty: 'medium',
        question: 'What does the term "chunking" refer to in memory?',
        options: [
            'Forgetting information over time',
            'Grouping information into meaningful units',
            'Retrieving stored memories',
            'Encoding visual information'
        ],
        correct: 1,
        explanation: 'Chunking is a memory strategy that involves grouping individual pieces of information into larger, more meaningful units.',
        points: 15
    },
    {
        id: 'cognitive-03',
        type: 'trivia',
        category: 'Cognitive Psychology',
        difficulty: 'medium',
        question: 'Which phenomenon describes remembering items at the beginning of a list better?',
        options: [
            'Recency Effect',
            'Primacy Effect',
            'Serial Position Effect',
            'Spacing Effect'
        ],
        correct: 1,
        explanation: 'The Primacy Effect is our tendency to remember items at the beginning of a list better than those in the middle.',
        points: 15
    },

    // Brain Development
    {
        id: 'development-01',
        type: 'trivia',
        category: 'Brain Development',
        difficulty: 'medium',
        question: 'At what age is the human brain fully developed?',
        options: [
            'Around 18 years',
            'Around 21 years',
            'Around 25 years',
            'Around 30 years'
        ],
        correct: 2,
        explanation: 'The prefrontal cortex, responsible for decision-making and impulse control, continues developing until around age 25.',
        points: 15
    },
    {
        id: 'development-02',
        type: 'trivia',
        category: 'Brain Development',
        difficulty: 'easy',
        question: 'What process removes unused neural connections in the developing brain?',
        options: [
            'Synaptic Pruning',
            'Myelination',
            'Neurogenesis',
            'Synaptogenesis'
        ],
        correct: 0,
        explanation: 'Synaptic pruning is the brain\'s way of removing unused neural connections, making neural networks more efficient.',
        points: 10
    },
    {
        id: 'development-03',
        type: 'trivia',
        category: 'Brain Development',
        difficulty: 'hard',
        question: 'Which area of the brain develops first in infancy?',
        options: [
            'Prefrontal Cortex',
            'Brainstem and Cerebellum',
            'Hippocampus',
            'Temporal Lobe'
        ],
        correct: 1,
        explanation: 'The brainstem and cerebellum develop first, controlling basic life functions and motor skills before higher cognitive areas.',
        points: 20
    },

    // Disorders and Conditions
    {
        id: 'disorder-01',
        type: 'trivia',
        category: 'Neurological Disorders',
        difficulty: 'easy',
        question: 'Which disorder is characterized by the loss of dopamine-producing neurons?',
        options: [
            'Alzheimer\'s Disease',
            'Parkinson\'s Disease',
            'Multiple Sclerosis',
            'Epilepsy'
        ],
        correct: 1,
        explanation: 'Parkinson\'s Disease results from the loss of dopamine-producing neurons in the substantia nigra, affecting movement control.',
        points: 10
    },
    {
        id: 'disorder-02',
        type: 'trivia',
        category: 'Neurological Disorders',
        difficulty: 'medium',
        question: 'What is the most common form of dementia?',
        options: [
            'Vascular Dementia',
            'Lewy Body Dementia',
            'Alzheimer\'s Disease',
            'Frontotemporal Dementia'
        ],
        correct: 2,
        explanation: 'Alzheimer\'s Disease accounts for 60-80% of dementia cases and is characterized by memory loss and cognitive decline.',
        points: 15
    },
    {
        id: 'disorder-03',
        type: 'trivia',
        category: 'Neurological Disorders',
        difficulty: 'hard',
        question: 'What characterizes the REM sleep behavior disorder?',
        options: [
            'Inability to fall asleep',
            'Acting out dreams physically',
            'Excessive daytime sleepiness',
            'Sleep paralysis'
        ],
        correct: 1,
        explanation: 'REM sleep behavior disorder involves physically acting out dreams due to loss of normal muscle paralysis during REM sleep.',
        points: 20
    }
];

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { allQuests };
}
