(function (_, sk, undefined) {
    'use strict';

    function Tournament(championship) {
        ///<param name='championship' type='H.ScoreKeeper.Championship' />
        this.name = championship.name;
        this.details = championship.details;
        this.timestamp = championship.timestamp;
        this.rounds = championship.rounds;
        this.winner = championship.winner;
        this.hasEnded = championship.hasEnded;
    }

    function StepThree(teams) {
        ///<param name='teams' type='Array' elementType='H.ScoreKeeper.Party' />

        var name = null;

        function constructTournament() {
            ///<returns type='Tournament' />
            return new Tournament(new sk.Championship(name).addParties(teams));
        }

        this.tournamentName = function (tournamentName) {
            name = tournamentName;
            return this;
        };
        this.finish = constructTournament;
        this.toJson = function () {
            return {
                name: name,
                teams: _.map(teams, function (t) {
                    /// <param name='t' type='H.ScoreKeeper.Party' />
                    return {
                        name: t.name,
                        individuals: t.individuals()
                    };
                })
            };
        };
    }
    StepThree.fromJson = function (dto) {
        return new StepThree(_.map(dto.teams, function (t) {
            return new sk.Party(t.name).addMembers(_.map(t.individuals, function (p) {
                return new sk.Individual(p.firstName, p.lastName);
            }));
        })).tournamentName(dto.name);
    };

    function StepTwo(individuals) {
        ///<param name='individuals' type='Array' elementType='H.ScoreKeeper.Individual' />

        var teams = [];

        function isTeamAdded(party) {
            return _.contains(teams, party);
        }

        function checkAllPartyMembersAreSubscribed(party) {
            /// <param name='party' type='H.ScoreKeeper.Party' />
            if (_.any(party.individuals(), function (i) { return !_.contains(individuals, i); })) {
                throw new Error('Team ' + party.name + ' has unsubscripted member(s).');
            }
        }

        function addTeam(party) {
            if (isTeamAdded(party)) {
                return;
            }
            checkAllPartyMembersAreSubscribed(party);
            teams.push(party);
        }

        this.team = function (party) {
            /// <param name='party' type='H.ScoreKeeper.Party' />
            addTeam(party);
            return this;
        };
        this.teams = function (parties) {
            ///<param name='parties' type='Array' elementType='H.ScoreKeeper.Party' />
            _.each(parties, addTeam);
            return this;
        };
        this.next = function () {
            ///<returns type='StepThree' />
            return new StepThree(teams);
        };
        this.toJson = function () {
            return {
                individuals: individuals,
                teams: _.map(teams, function (t) {
                    /// <param name='t' type='H.ScoreKeeper.Party' />
                    return {
                        name: t.name,
                        individuals: _.map(t.individuals(), function (p) {
                            /// <param name='p' type='H.ScoreKeeper.Individual' />
                            return p.id();
                        })
                    };
                })
            };
        };
    }
    StepTwo.fromJson = function (dto) {
        var individuals = _.map(dto.individuals, function (p) { return new sk.Individual(p.firstName, p.lastName); });
        return new StepTwo(individuals)
            .teams(_.map(dto.teams, function (t) {
                return new sk.Party(t.name).addMembers(_.map(t.individuals, function (pId) {
                    return _.find(individuals, function (p) { return p.id() === pId; });
                }));
            }));
    };

    function StepOne() {

        var participants = [];

        function isParticipantAdded(individual) {
            _.contains(participants, individual);
        }

        function addParticipant(individual) {
            if (isParticipantAdded(individual)) {
                return;
            }
            participants.push(individual);
        }

        this.addParticipant = function (individual) {
            ///<param name='individual' type='H.ScoreKeeper.Individual' />
            addParticipant(individual);
            return this;
        };
        this.addParticipants = function (individuals) {
            ///<param name='individuals' type='Array' elementType='H.ScoreKeeper.Individual' />
            _.each(individuals, addParticipant);
            return this;
        };
        this.next = function () {
            ///<returns type='StepTwo' />
            return new StepTwo(participants);
        };
        this.toJson = function () {
            return {
                participants: participants
            };
        };
    }
    StepOne.fromJson = function (dto) {
        return new StepOne()
            .addParticipants(_.map(dto.participants, function (p) {
                return new sk.Individual(p.firstName, p.lastName);
            }));
    };

    this.Wizard = this.Wizard || {};
    this.Wizard.Tournament = this.Wizard.Tournament || {};
    this.Wizard.Tournament.StepOne = StepOne;
    this.Wizard.Tournament.StepTwo = StepTwo;
    this.Wizard.Tournament.StepThree = StepThree;

}).call(this, this._, this.H.ScoreKeeper);